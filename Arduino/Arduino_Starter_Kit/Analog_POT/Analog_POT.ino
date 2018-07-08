int value = 0;
int mval;
void setup() {
  pinMode(5, OUTPUT);
}

void loop() {
  value = analogRead(A1);
  mval = map(value, 0, 1023, 0, 100);
  // analogWrite can adjust the ouput
  analogWrite(5, mval);
}
