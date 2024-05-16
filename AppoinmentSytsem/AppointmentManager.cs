using System;
using System.Collections.Generic;

namespace AppoinmentSytsem
{

    public delegate void AppointmentAdded();  // delegate

    public class AppointmentManager
    {
        public List<Doctor> doctors = new List<Doctor>();
        public List<Patient> patients = new List<Patient>();
        public List<Appointment> appointments = new List<Appointment>();

        public event AppointmentAdded appointmentStatus; //event
        public static Patient Patient;


        public void MainMenu()
        {
            Console.WriteLine("Menu Menu \n\t1.Login\n\t2.Register\n\t3.Exit");
            Console.Write("Please Mention Your Option : ");
            int mainOption = int.Parse(Console.ReadLine());
            switch (mainOption)
            {
                case 1:
                    {
                        Login();
                        break;
                    }
                case 2:
                    {
                        Register();
                        break;
                    }
                case 3:
                    {
                        Environment.Exit(1);
                        break;
                    }
            }
        }

        public void Register()
        {
            Console.Write("Enter Your Name :");
            string name = Console.ReadLine();
            Console.Write("Enter password : ");
            string password = Console.ReadLine();
            Console.Write("Enter the Age :");
            int age = int.Parse(Console.ReadLine());
            Console.Write("Enter your Gender :");
            Gender gender = Enum.Parse<Gender>(Console.ReadLine(), true);

            Patient patient = new Patient(name, password, age, gender);
            patients.Add(patient);
            Console.WriteLine("Registered successfully");
            Console.WriteLine($"Your Patient ID is {patient.PatientID}");
            MainMenu();
        }

        public void Login()
        {
            Console.Write("Enter Your UserName : ");
            string userName = Console.ReadLine();
            Console.Write("Enter Your Password  : ");
            string password = Console.ReadLine();
            bool flag = true;
            foreach (Patient user in patients)
            {
                if (user.Name.Equals(userName) && user.Password.Equals(password))
                {
                    flag = false;
                    Patient = user;
                    SubMenu();
                }
            }
            if (flag)
            {
                Console.WriteLine("Invalid UserName & Password");
            }
        }
        public void SubMenu()
        {
            string choice = "yes";
            do
            {


                Console.WriteLine("Patient Menu \n\t1.BookAppointment\n\t2.View Appointment details\n\t3.Edit my profile\n\t4.Exit");
                Console.Write("Please mention Your Option : ");
                int subOption = int.Parse(Console.ReadLine());
                switch (subOption)
                {
                    case 1:
                        {
                            BookAppointment();
                            break;
                        }
                    case 2:
                        {
                            ViewAppointments();
                            break;
                        }
                    case 3:
                        {
                            EditPatientProfile(Patient.PatientID);
                            break;
                        }
                    case 4:
                        {
                            choice = "no";
                            break;
                        }
                }
            } while (choice == "yes");
        }

        public void BookAppointment()
        {
            Console.Write("Select the department from The below List : \n\t1.Anaesthesiology\n\t2.Cardiology\n\t3.Diabetology\n\t4.Neonatology\n\t5.Nephrology");
            Console.Write("Choice : ");
            int choice = int.Parse(Console.ReadLine());
            string department = string.Empty;
            switch (choice)
            {
                case 1:
                    {
                        department = "Anaesthesiology";
                        break;
                    }
                case 2:
                    {
                        department = "Cardiology";
                        break;
                    }
                case 3:
                    {
                        department = "Diabetology";
                        break;
                    }
                case 4:
                    {
                        department = "Neonatology";
                        break;
                    }
                case 5:
                    {
                        department = "Nephrology";
                        break;
                    }
            }
            Console.Write("Please Mention Your problem : ");
            string problem = Console.ReadLine();

            int doctorID = 0;
            foreach (Doctor item in doctors)
            {
                if (item.Department.Equals(department))
                {
                    doctorID = item.DoctorID;
                }
            }
            int count = 0;
            foreach (Appointment appointment in appointments)
            {

                if (doctorID.Equals(appointment.DoctorID) && DateTime.Now.ToString("MM/dd/yyyy").Equals(appointment.Date.ToString("MM/dd/yyyy")))
                {
                    count++;
                }
            }

            if (count == 0 || count == 1)
            {
                Console.WriteLine($"Appointment is confirmed for the date : {DateTime.Now.ToString("MM/dd/yyyy")}. To Book press \"Y\",to Cancel press \"N\"");
                Console.Write("Option :");
                char option = char.Parse(Console.ReadLine());
                if (option == 'Y')
                {

                    appointments.Add(new Appointment(Patient.PatientID, doctorID, DateTime.Now, problem));
                    //Console.WriteLine("Appointment confirmed successfully");
                    onAppointmentAdded();
                }
                else
                {
                    Console.WriteLine("Appointment  not  confirmed");
                    SubMenu();
                }

            }
            else if (count == 2)
            {
                Console.WriteLine($"Currently No Doctor available for the date :  {DateTime.Now.ToString("MM/dd/yyyy")}");
            }

        }
        protected virtual void onAppointmentAdded()
        {
            appointmentStatus?.Invoke();
        }

        public void ViewAppointments()
        {
            Console.WriteLine("|AppointmentID|\t|PatientID|\t|DoctorID|\t|Date|\t  |Problem|");
            Console.WriteLine("--------------------------------------------------------------------");
            foreach (Appointment appointment in appointments)
            {
                if (appointment.PatientID.Equals(Patient.PatientID))
                {
                    Console.WriteLine($"{appointment.AppointmentID,6}\t{appointment.PatientID,12}\t{appointment.DoctorID,12}\t{appointment.Date.ToString("MM/dd/yyyy"),15}\t{appointment.Problem,2}\t");
                }
            }
        }

        public void EditPatientProfile(int paramPatientID)
        {
            foreach (Patient user in patients)
            {
                if (user.PatientID.Equals(paramPatientID))
                {
                    string editOption = "yes";
                    do
                    {
                        Console.WriteLine("To Edit :\n1.Name\n2.Password\n3.Age\n4.Gender\n5.Back to Patient Menu");
                        Console.Write("Please Mention Your Option to Edit : ");
                        int option = int.Parse(Console.ReadLine());
                        switch (option)
                        {
                            case 1:
                                {
                                    Console.Write("Enter Your Name :");
                                    string name = Console.ReadLine();
                                    user.Name = name;
                                    Console.WriteLine("UserName successfully Updated");
                                    break;
                                }
                            case 2:
                                {
                                    Console.Write("Enter password : ");
                                    string password = Console.ReadLine();

                                    user.Password = password;
                                    Console.WriteLine("Password successfully Updated");
                                    break;
                                }
                            case 3:
                                {
                                    Console.WriteLine("Enter the Age :");
                                    int age = int.Parse(Console.ReadLine());
                                    user.Age = age;
                                    Console.WriteLine("Age successfully Updated");
                                    break;
                                }
                            case 4:
                                {
                                    Console.Write("Enter your Gender :");
                                    Gender gender = Enum.Parse<Gender>(Console.ReadLine(), true);
                                    user.Gender = gender;
                                    Console.WriteLine("Gender successfully Updated");
                                    break;
                                }
                            case 5:
                                {
                                    editOption = "no";
                                    break;
                                }

                        }
                    } while (editOption == "yes");

                }
            }
        }

        public void DefaultData()
        {
            doctors.Add(new Doctor("Nancy", "Anaesthesiology"));
            doctors.Add(new Doctor("Andrew", "Cardiology"));
            doctors.Add(new Doctor("Janet", "Diabetology"));
            doctors.Add(new Doctor("Margaret", "Neonatology"));
            doctors.Add(new Doctor("Steven", "Nephrology"));

            patients.Add(new Patient("Robert", "welcome", 40, Gender.Male));
            patients.Add(new Patient("Laura", "welcome", 36, Gender.Femail));
            patients.Add(new Patient("Anne", "welcome", 42, Gender.Femail));


            appointments.Add(new Appointment(1, 2, new DateTime(2012, 08, 03), "Heart Problem"));
            appointments.Add(new Appointment(1, 5, new DateTime(2012, 08, 03), "Spinal cord injury"));
            appointments.Add(new Appointment(2, 2, new DateTime(2012, 08, 03), "Heart attack"));
        }



    }
}
