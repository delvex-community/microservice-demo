for i in  aboutus.yaml contact.yaml course.yaml exams.yaml home.yaml login.yaml mongo.yaml nodeapp.yaml aboutus.svc.yaml contact.svc.yaml courses.svc.yaml exams.svc.yaml home.svc.yaml login.svc.yaml mongo.svc.yaml nodeapp.svc.yaml ingress.yaml
do 
  kubectl apply -f $i 
done
