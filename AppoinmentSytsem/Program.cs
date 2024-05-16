using System;
using AppoinmentSytsem;
namespace AppoinmentSystem;
public class Program
{
    public static void Main(string[] args)
    {
        AppointmentManager appointment = new AppointmentManager();
        appointment.appointmentStatus += AppointmentAdded;
        appointment.DefaultData();
        appointment.MainMenu();
    }

    //event Handler
    public static void AppointmentAdded()
    {
        Console.WriteLine("Appointment Added");
    }

}