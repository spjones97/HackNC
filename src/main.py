import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)
GPIO.setup(10, GPIO.IN)
GPIO.setup(4, GPIO.IN)

#Upon entering, beam 1 is broken before beam 2

first = False
second = False
direction = "empty"
count = 0

while True:
    if GPIO.input(4) == 0:
        first = True
        direction = "exit"
    if GPIO.input(10) == 0:
        second = True
        direction = "enter"
    if first and second:
        if direction == "enter":
            count = count + 1
            print("One person entered. Occupancy is " + str(count))
        if direction == "exit":
            if count > 0:
                count = count - 1
                print("One person exited. Occupancy is " + str(count))
            else:
                print("One person exited. Occupancy is " + str(count))
        first = False
        second = False
        time.sleep(0.5)