import cv2
import pytesseract
import requests
import statistics as stat
from datetime import datetime


url = 'http://localhost:3000/api/create&entry'



def enviarDatos(placas):
    placa = stat.mode(placas) 
    now = datetime.now()
    
    print("--->",placa)
    date_init = str(now.day)+"/"+str(now.month)+"/"+str(now.year)
    time_init = str(now.hour)+":"+str(now.minute)+":"+str(now.second)
    response = requests.post(url, json = {'placa': placa , "date_init":date_init,"time_init": time_init }  ) 
    if response.status_code == 200:
        data = response.json()
        print(data)
    else:
        print('Error al obtener los datos. Código de estado:', response.status_code)
    
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract'
cap = cv2.VideoCapture(0)
placa = []
placas= []
while (True):
    ret, frame = cap.read()
    cv2.imshow('frame', frame)
    gray = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
    gray = cv2.blur(gray,(3,3))
    canny = cv2.Canny(gray,150,200)
    canny = cv2.dilate(canny,None,iterations=1)
    cnts,_ = cv2.findContours(canny,cv2.RETR_LIST,cv2.CHAIN_APPROX_SIMPLE)
    

    for c in cnts:
        area = cv2.contourArea(c)
        x,y,w,h = cv2.boundingRect(c)
        epsilon = 0.09*cv2.arcLength(c,True)
        approx = cv2.approxPolyDP(c,epsilon, True)

        if len(approx)==4 and area>1000:
            aspect_ratio = float(w)/h
            if aspect_ratio>1.6:
                chars = '|:.,!()\n'
                placa = gray [y:y+h,x:x+w]
                text = pytesseract.image_to_string(placa, config='--psm 11')
                text = text.translate(str.maketrans('', '', chars))
                
                if(text.replace(" ","") != "" and len(text) == 6 ):
                    placas.append(text.replace(" ",""))
                    print('PLACAS->',len(placas), "--->" ,placas )
                if(len(placas) == 20 ):
                    enviarDatos(placas)
                    placas = []
                cv2.imshow('placa',placa)
                cv2.moveWindow('placa',780,10)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cv2.imshow('Image',image)
cv2.waitKey(0) 
cap.release()
cv2.destroyAllWindows()


