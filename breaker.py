for i in range(1,999):
     params = dict(
             pin=i
     )
     resp=requests.get(url=url,params=params)
     data = resp.json()
    
     if(data["accept"] == "Yesss"):
     	print(i, resp.json())