using System;

namespace AppoinmentSytsem
{
    public enum Gender {Male,Femail}
    public class Patient
    {
        private static int s_patientID=1;
        public int PatientID{ get;}
        public string Name { get; set; }
        public string Password { get; set; }
        public int Age { get; set; }
        public Gender Gender { get; set; }
        
        
       public Patient(string paraName,string paramPassword,int paramAge,Gender paramGender)
        {
               PatientID=s_patientID;
               Password=paramPassword;
               Name=paraName;
               Age=paramAge;
               Gender=paramGender;
               s_patientID++;
        }
        
        
        
        
    }
}
