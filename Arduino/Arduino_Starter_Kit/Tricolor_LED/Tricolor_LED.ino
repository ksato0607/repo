int DELAY_TIME = 300;
void setup()  {

}

void loop()  {
  int b = 0;
  analogWrite(9, b);
  analogWrite(10, 255);
  analogWrite(11, 255);
  delay(DELAY_TIME);
  int g = 0;
  analogWrite(9, 255);
  analogWrite(10, g);
  analogWrite(11, 255);
  delay(DELAY_TIME);
  int r = 0;
  analogWrite(9, 255);
  analogWrite(10, 255);
  analogWrite(11, r);
  delay(DELAY_TIME);
}


int randNum(int min, int max)
{
  int x = rand() % min +  max;
  return x;
}

