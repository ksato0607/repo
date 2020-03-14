#include <ArduinoSTL.h>
#include <queue>

int transitionDelayOff = 100;
int transitionDelayOn;
// If we want to have a consistent delay, set randomDelay to 1.
int randomDelay = 1;
int baseDelay = 100;
int rclkPin = 6;   // ST_CP [RCLK] on 74HC595
int srclkPin = 5;   // SH_CP [SRCLK] on 74HC595
int dsPin = 7;     // DS [SER] on 74HC595
int maxThreshold = 35;
int minThreshold = 15;
//TODO Support for multiple sensors
int leds = 0;
boolean shouldValidateShadow = false;
boolean hasNewSensor = true;
boolean hasShadow = false;

const int ledRow = 4;
const int ledColumn =  4;
int arr[ledRow][ledRow] = {{16, 32, 64, 1},
                          {4096, 512, 32768, 2},
                          {8192, 1024, 256, 8},
                          {16384, 2048, 128, 4}};
const int sensorRow = 3;
const int sensorColumn = 3;

boolean sensorStatus[sensorRow][sensorColumn] = {{false, false, false}, 
                                                  {false, false, false},
                                                  {false, false, false}};

std::queue<int> fullLedPathX;
std::queue<int> fullLedPathY;
std::queue<int> remainingLedPathX;
std::queue<int> remainingLedPathY;

// Pin Definitions 
const int NMP = 2; // Number of multiplexer
const int OFM = 3; //There are three outputs for multiplexer
const int maxPin = 8;
int pinNumbers[NMP] = {8,1};
int selectPins[NMP][OFM] = {{13,12,11},
                            {10,9,8}}; // S0~2, S1~3, S2~4 
int zInput[NMP] = {A0, A1}; // Connect common (Z) to A0 (analog input)

void setup() 
{
  Serial.begin(9600);
  
  // Initialize shift-resistor 
  pinMode(rclkPin, OUTPUT);
  pinMode(dsPin, OUTPUT);
  pinMode(srclkPin, OUTPUT);

  //  Initialize multiplexer
  // j is the current multiplexer
  for (int j=0; j<NMP; j++) {
    for (int i=0; i<OFM; i++)
    {
      pinMode(selectPins[j][i], OUTPUT);
      digitalWrite(selectPins[j][i], HIGH);
    }
    pinMode(zInput[j], INPUT);
  }
}

void loop() 
{
  checkSensors();

  if (hasNewSensor) {
    ledSwitchOff();
    generateLedPath();
  }

  if (hasNext()) {
    updateCurrent();
    ledSwitchOn(leds);
  } else {
    ledSwitchOff();
    restartLedPath();
  }
}

void ledSwitch(int leds) {
  digitalWrite(rclkPin, LOW);                //送信中のRCLKをLowにする
  MyShiftOut( dsPin, srclkPin, 16, leds );
  digitalWrite(rclkPin, HIGH);               //送信終了後RCLKをHighにする
}

void ledSwitchOn(int leds) {
  ledSwitch(leds);
  transitionDelayOn = rand() % randomDelay + baseDelay;
  delay(transitionDelayOn);
}

void MyShiftOut( int dataPin, int clockPin, int bit, int val )
{
  for( int i = 0; i < bit; i++ )
  {
    digitalWrite(dataPin, !(val & (1L << i)));
    digitalWrite(clockPin, HIGH);
    digitalWrite(clockPin, LOW);
  }
}

void checkSensors() {
  hasNewSensor = false;
  boolean newSensorStatus[sensorRow][sensorColumn] = {};
  memcpy ( &newSensorStatus, &sensorStatus, sizeof(sensorStatus) );
  int sensorOffToOn = 0;
  int sensorOnToOff = 0;
  hasShadow = false;

  // j is the current multiplexer
  for (int j=0; j<NMP; j++) {
   // Loop through all eight pins.
    for (byte pin=0; pin<pinNumbers[j]; pin++){
      for (int i=0; i<OFM; i++){
        if (pin & (1<<i)) {
          digitalWrite(selectPins[j][i], HIGH); 
        } else {
          digitalWrite(selectPins[j][i], LOW);
        }
      }
      
      int input = analogRead(zInput[j]);
      int currentSensor = false;
      int row = (pin + j * maxPin) / sensorColumn;
      int column = (pin + j * maxPin) % sensorColumn;
 
      // TODO [Debug] remove this
      if (j == 0 && pin == 0) {
        Serial.println(input);  
      }

      if ((shouldValidateShadow && input < minThreshold)) {
        hasShadow = true;
      } 
      
      if (input < maxThreshold) {
        currentSensor = true;
      }

      if (newSensorStatus[row][column] == false && currentSensor == true) {
        sensorOffToOn++;
      } else if (newSensorStatus[row][column] == true && currentSensor == false) {
        sensorOnToOff++;
      }
      
      newSensorStatus[row][column] = currentSensor;
    } 
  }

  if (!hasShadow && (sensorOffToOn+sensorOnToOff) >= 1) {
    hasNewSensor = true;
    memcpy ( &sensorStatus, &newSensorStatus, sizeof(newSensorStatus) );
  }
}

void ledSwitchOff() {
  leds = 0;
  ledSwitch(leds);
  delay(transitionDelayOff);
}

void updateCurrent() {
  int currentLedX = remainingLedPathX.front();
  int currentLedY = remainingLedPathY.front();
  remainingLedPathX.pop();
  remainingLedPathY.pop();
  
  leds += arr[currentLedX][currentLedY];
}

boolean hasNext() {
  return !remainingLedPathX.empty();
}

void generateLedPath() {
  clearQueue();
  boolean pathCompleted = false;
  boolean hasFirstSensor = false;
  int currentX = 0;
  int currentY = 0;

  boolean ledArray[ledRow][ledColumn] = {{false, false, false, false},
                                        {false, false, false, false},
                                        {false, false, false, false},
                                        {false, false, false, false}};

  for( int i = 0; i < sensorRow; i++ ) {
    for( int j = 0; j < sensorColumn; j++ ) {
      if (sensorStatus[i][j]) {
        ledArray[i][j] = sensorStatus[i][j];
        ledArray[i][j+1] = sensorStatus[i][j];
        ledArray[i+1][j] = sensorStatus[i][j];
        ledArray[i+1][j+1] = sensorStatus[i][j]; 

        if (!hasFirstSensor) {
          currentX = i;
          currentY = j;
          hasFirstSensor = true;
        }
      }
    }  
  }

  // Adject ledArray to switch off inner leds. 
  // For example
  // true true true     true true  true
  // true true true =>  true false true
  // true true true     true true  true
  for( int i = 0; i < sensorRow; i++ ) {
    for( int j = 0; j < sensorColumn; j++ ) {
      boolean innerLed = !outOfBoundary(i, j) && sensorStatus[i][j] && !outOfBoundary(i, j-1) && sensorStatus[i][j-1] && !outOfBoundary(i-1, j) && sensorStatus[i-1][j] && !outOfBoundary(i-1, j-1) && sensorStatus[i-1][j-1];
      if (innerLed) {
        ledArray[i][j] = false;
      }
    }  
  }
  

  while (hasFirstSensor && !pathCompleted) {
    addToPath(currentX, currentY);
    ledArray[currentX][currentY] = false;

    if (!outOfBoundary(currentX, currentY-1) && ledArray[currentX][currentY-1] == true) {
        currentY = currentY-1;
    } else if (!outOfBoundary(currentX+1, currentY) && ledArray[currentX+1][currentY] == true) {
      currentX = currentX+1;
    } else if (!outOfBoundary(currentX, currentY+1) && ledArray[currentX][currentY+1] == true) {
      currentY = currentY+1;
    } else if (!outOfBoundary(currentX-1, currentY) && ledArray[currentX-1][currentY] == true) {
      currentX = currentX-1;
    } else {
      pathCompleted = true;
    }
  }

  remainingLedPathX = fullLedPathX;
  remainingLedPathY = fullLedPathY; 
}

void restartLedPath() {
  remainingLedPathX = fullLedPathX;
  remainingLedPathY = fullLedPathY;
}

void clearQueue() {
  std::queue <int> empty;
  fullLedPathX = empty;
  fullLedPathY = empty;
  remainingLedPathX = fullLedPathX;
  remainingLedPathY = fullLedPathY;
}

void addToPath(int currentX, int currentY) {
  fullLedPathX.push(currentX);
  fullLedPathY.push(currentY);
}

boolean outOfBoundary(int currentX, int currentY) {
  return currentX < 0 || currentY < 0 || currentX > ledRow-1 || currentY > ledColumn-1;
}

