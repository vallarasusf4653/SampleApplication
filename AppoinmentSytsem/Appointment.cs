using System;

namespace AppoinmentSytsem
{
    public class Appointment
    {
        private static int s_appointmentID=1;
        public int AppointmentID { get;}
        public int PatientID { get; set; }
        public int DoctorID { get; set; }
        public DateTime Date { get; set; }
        public string Problem { get; set; }
        
        
        
        
      public  Appointment(int paramPatientID,int paramDoctorID,DateTime paramDate,string paramProblem)
        {
                AppointmentID=s_appointmentID;
                PatientID=paramPatientID;
                DoctorID=paramDoctorID;
                Date=paramDate;
                Problem=paramProblem;
                s_appointmentID++;
            
        }
        
        
    }
}
