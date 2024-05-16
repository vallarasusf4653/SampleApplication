using System;
using System.Security.Cryptography;
namespace LinqExcerice;
class Program
{
    public static void Main(string[] args)
    {

        TraineeData train = new TraineeData();
        IEnumerable<TraineeDetails> result = train.GetTraineeDetails();
        TraineeScore traineeScore = new TraineeScore();

        Console.WriteLine("Menu : \nPress 1 to Show the list of Trainee Id\nPress 2 to Show the first 3 Trainee Id using Take\nPress 3 to show the last 2 Trainee Id using Skip\nPress 4 to show the count of Trainee\nPress 5 to show the Trainee Name who are all passed out 2019 or later");
        Console.WriteLine("Press 6 to show the Trainee Id and Trainee Name by alphabetic order of the trainee name.\nPress 7 to show the Trainee Id, Trainee Name, Topic Name, Exercise Name and Mark who are all scores the more than or equal to 4 mark\nPress 8 to show the unique passed out year using distinct\nPress 9 to show the total marks of single user (get the Trainee Id from User), if Trainee Id does not exist, show the invalid message\nPress 10 to show the first Trainee Id and Trainee Name\nPress 11 to show the last Trainee Id and Trainee Name\nPress 12 to print the total score of each trainee");
        Console.WriteLine("Press 13 to show the maximum total score\nPress 14 to show the minimum total score\nPress 15 to show the average of total score\nPress 16 to show true or false if any one has the more than 40 score using any()\nPress 17 to show true of false if all of them has the more than 20 using all()\nPress 18 to show the Trainee Id, Trainee Name, Topic Name, Exercise Name and Mark by show the Trainee Name as descending order and then show the Mark as descending order.");

        Console.Write("Please Mention Your Option : ");
        int option = int.Parse(Console.ReadLine());
        switch (option)
        {
            case 1:
                {
                    var output = from trainee in result
                                 select trainee.TraineeId;
                    Console.WriteLine("The List Of Trainee ID");
                    foreach (var item in output)
                    {
                        Console.WriteLine(item);
                    }
                    break;
                }
            case 2:
                {
                    var output = result.Take(3);
                    foreach (var item in output)
                    {
                        Console.WriteLine(item.TraineeId);
                    }
                    break;
                }
            case 3:
                {
                    int count = result.Count();
                    var output = result.Skip(count - 2);
                    foreach (var item in output)
                    {
                        Console.WriteLine(item.TraineeId);
                    }
                    break;
                }
            case 4:
                {
                    Console.WriteLine($"The Count of Trainee : {result.Count()}");
                    break;
                }
            case 5:
                {
                    var output = from trainee in result
                                 where trainee.YearPassedOut >= 2019
                                 select trainee.TraineeName;
                    Console.WriteLine("The List Of Trainee Name");
                    foreach (var item in output)
                    {
                        Console.WriteLine(item);
                    }
                    break;

                }
            case 6:
                {
                    var output = from trainee in result
                                 orderby trainee.TraineeName
                                 select (trainee.TraineeId, trainee.TraineeName);
                    Console.WriteLine("The List Of Trainee Name");
                    foreach (var item in output)
                    {
                        Console.WriteLine($" Trainee ID : {item.TraineeId}\tTrainee Name : {item.TraineeName}");
                    }
                    break;
                }
            case 7:
                {
                    var output = from trainee in result
                                 from score in trainee.ScoreDetails
                                 where score.Mark >= 4
                                 select
                                (trainee.TraineeId,
                                trainee.TraineeName,
                                score.TopicName,
                                score.ExerciseName, score.Mark
                                );

                    Console.WriteLine("The List Of Trainee Name");
                    foreach (var item in output)
                    {
                        Console.WriteLine($" Trainee ID : {item.TraineeId}\tTrainee Name : {item.TraineeName}\tTopic Name : {item.TopicName}\tExercise Name : {item.ExerciseName}\tMark : {item.Mark}");
                    }
                    break;
                }
            case 8:
                {
                    var output = result.Select(x => x.YearPassedOut).Distinct();
                    foreach (var item in output)
                    {
                        Console.WriteLine(item);
                    }
                    break;
                }
            case 9:
                {
                    Console.Write("Enter the Trainee ID : ");
                    string traineeID = Console.ReadLine().ToUpper();
                    bool isvalid = result.Any(x => x.TraineeId == traineeID);
                    if (isvalid)
                    {
                        var output = (from trainee in result
                                      from score in trainee.ScoreDetails
                                      where trainee.TraineeId == traineeID
                                      select score.Mark).Sum();
                        Console.WriteLine(output);
                    }
                    else
                    {
                        Console.WriteLine("Invalid Trainee ID");
                    }


                    break;
                }
            case 10:
                {
                    var output = result.Take(1);
                    foreach (var item in output)
                    {
                        Console.WriteLine($"TraineeID : {item.TraineeId}\t TraineeName : {item.TraineeName}");
                    }

                    break;
                }
            case 11:
                {
                    int count = result.Count();
                    var output = result.Skip(count - 1);
                    foreach (var item in output)
                    {
                        Console.WriteLine($"TraineeID : {item.TraineeId}\t TraineeName : {item.TraineeName}");
                    }

                    break;


                }
            case 12:
                {
                    var output = from trainee in result select (new { totalscore = trainee.ScoreDetails.Sum(s => s.Mark) }, trainee.TraineeId);
                    foreach (var item in output)
                    {
                        Console.WriteLine($"Trainee ID : {item.TraineeId}\tTotal score : {item.Item1.totalscore}");
                    }
                    break;
                }
            case 13:
                {
                    var output = (from trainee in result select trainee.ScoreDetails.Sum(s => s.Mark)).Max();
                    Console.WriteLine($"Max score : {output}");
                    break;
                }
            case 14:
                {
                    var output = (from trainee in result select trainee.ScoreDetails.Sum(s => s.Mark)).Min();
                    Console.WriteLine($"Max score : {output}");
                    break;
                }
            case 15:
                {
                    var output = from trainee in result select (new { Average = trainee.ScoreDetails.Sum(s => s.Mark) / result.Count() });
                    foreach (var item in output)
                    {
                        Console.WriteLine(item);
                    }
                    break;

                }
            case 16:
                {
                    var output = from trainee in result select (new { totalscore = trainee.ScoreDetails.Sum(s => s.Mark) });
                    Console.WriteLine(output.Any(x => x.totalscore > 40));

                    break;

                }
            case 17:
                {
                    var output = from trainee in result select (new { totalscore = trainee.ScoreDetails.Sum(s => s.Mark) });
                    Console.WriteLine(output.All(x => x.totalscore > 20));
                    break;
                }
            case 18:
                {

                    var output = from trainee in result
                                 orderby trainee.TraineeName descending
                                 select trainee;

                    foreach (var item in output)
                    {
                        var output1 = from value in item.ScoreDetails
                                      orderby value.Mark descending
                                      select value;

                        foreach (var value in output1)
                        {
                            Console.WriteLine($"Traineee ID : {item.TraineeId}\t Trainee Name : {item.TraineeName}\t Toic Name : {value.TopicName}\t Exercise Name : {value.ExerciseName}\t Mark : {value.Mark}");

                        }
                    }
                    break;
                }
        }

    }
}