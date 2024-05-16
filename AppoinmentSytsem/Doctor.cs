using System;

namespace AppoinmentSytsem
{
    public class Doctor
    {

        private static int s_doctorID = 1;
        public int DoctorID { get; }
        public string Name { get; set; }
        public string Department { get; set; }


       public Doctor(string paramName, string paramDepartment)
        {
            DoctorID = s_doctorID;
            Name = paramName;
            Department = paramDepartment;
            s_doctorID++;
        }

    }
}
