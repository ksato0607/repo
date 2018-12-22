char inputButtonState;

void setup() {
  pinMode(8, OUTPUT);
  pinMode(12, INPUT);
}

void loop() {
  inputButtonState = digitalRead(12);

  if (inputButtonState == HIGH) {
    digitalWrite(8, HIGH);
  } else {
    digitalWrite(8, LOW);
  }
}
