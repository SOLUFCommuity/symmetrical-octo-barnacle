import time
from datetime import datetime

def automated_task():
    print("Running automated task at", datetime.now())

while True:
    automated_task()
    time.sleep(10)  # ทำงานทุก 10 วินาที
