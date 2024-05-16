using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LinqExcerice
{
    /// <summary>
    /// Information of Trainees
    /// </summary>
    public class TraineeDetails
    {
        public string TraineeId { get; set; }
        public string TraineeName { get; set; }
        public string DOJ { get; set; }
        public List<TraineeScore> ScoreDetails { get; set; }
        public int YearPassedOut { get; set; }
        public int TotalScore { get; set; }

    }

    /// <summary>
    /// Information of Trainees Scores
    /// </summary>
    public class TraineeScore
    {
        public string TopicName { get; set; }
        public string ExerciseName { get; set; }
        public int Mark { get; set; }
    }

    /// <summary>
    /// Trainee Details
    /// </summary>
    public class TraineeData
    {
        public List<TraineeDetails> GetTraineeDetails()
        {
            List<TraineeDetails> traineeDetails = new List<TraineeDetails>
            {
                new TraineeDetails { TraineeId ="SF2001" , TraineeName = "Dhinesh" , DOJ ="16/07/2019" , YearPassedOut = 2019,
                                     ScoreDetails = new List<TraineeScore>
                                     {
                                         new TraineeScore {TopicName="HTML",ExerciseName="HTML Elements", Mark=5 },
                                         new TraineeScore {TopicName="HTML",ExerciseName="HTML Table Format", Mark=4 },
                                         new TraineeScore {TopicName="CSS",ExerciseName="Colors and Styles", Mark=5 },
                                         new TraineeScore {TopicName="JavaScript",ExerciseName="Cookies", Mark=4 },
                                         new TraineeScore {TopicName="C#",ExerciseName="String Operations", Mark=3 },
                                         new TraineeScore {TopicName="C#",ExerciseName="List and Properties", Mark=5 },
                                         new TraineeScore {TopicName="MVC",ExerciseName="Controllers", Mark=5 }
                                     }
                },

                new TraineeDetails { TraineeId ="SF2002" , TraineeName = "Dheepa" , DOJ ="17/08/2019" , YearPassedOut = 2019,
                                     ScoreDetails = new List<TraineeScore>
                                     {
                                         new TraineeScore {TopicName="HTML",ExerciseName="HTML Elements", Mark=2 },
                                         new TraineeScore {TopicName="HTML",ExerciseName="HTML Table Format", Mark=3 },
                                         new TraineeScore {TopicName="CSS",ExerciseName="Colors and Styles", Mark=4 },
                                         new TraineeScore {TopicName="JavaScript",ExerciseName="Cookies", Mark=2 },
                                         new TraineeScore {TopicName="C#",ExerciseName="String Operations", Mark=1 },
                                         new TraineeScore {TopicName="C#",ExerciseName="List and Properties", Mark=2 },
                                         new TraineeScore {TopicName="MVC",ExerciseName="Controllers", Mark=3 }
                                     }
                },

                new TraineeDetails { TraineeId ="SF2003" , TraineeName = "Mani" , DOJ ="18/08/2019" , YearPassedOut = 2018,
                                     ScoreDetails = new List<TraineeScore>
                                     {
                                         new TraineeScore {TopicName="HTML",ExerciseName="HTML Elements", Mark=4 },
                                         new TraineeScore {TopicName="HTML",ExerciseName="HTML Table Format", Mark=3 },
                                         new TraineeScore {TopicName="CSS",ExerciseName="Colors and Styles", Mark=4 },
                                         new TraineeScore {TopicName="JavaScript",ExerciseName="Cookies", Mark=5 },
                                         new TraineeScore {TopicName="C#",ExerciseName="String Operations", Mark=4 },
                                         new TraineeScore {TopicName="C#",ExerciseName="List and Properties", Mark=5 },
                                         new TraineeScore {TopicName="MVC",ExerciseName="Controllers", Mark=3 }
                                     }
                },

                new TraineeDetails { TraineeId ="SF2004" , TraineeName = "Ram" , DOJ ="17/08/2019" , YearPassedOut = 2019,
                                     ScoreDetails = new List<TraineeScore>
                                     {
                                         new TraineeScore {TopicName="HTML",ExerciseName="HTML Elements", Mark=2 },
                                         new TraineeScore {TopicName="HTML",ExerciseName="HTML Table Format", Mark=1 },
                                         new TraineeScore {TopicName="CSS",ExerciseName="Colors and Styles", Mark=1 },
                                         new TraineeScore {TopicName="JavaScript",ExerciseName="Cookies", Mark=4 },
                                         new TraineeScore {TopicName="C#",ExerciseName="String Operations", Mark=2 },
                                         new TraineeScore {TopicName="C#",ExerciseName="List and Properties", Mark=3 },
                                         new TraineeScore {TopicName="MVC",ExerciseName="Controllers", Mark=2 }
                                     }
                },

                new TraineeDetails { TraineeId ="SF2005" , TraineeName = "Rekha" , DOJ ="17/08/2019" , YearPassedOut = 2018,
                                     ScoreDetails = new List<TraineeScore>
                                     {
                                         new TraineeScore {TopicName="HTML",ExerciseName="HTML Elements", Mark=5 },
                                         new TraineeScore {TopicName="HTML",ExerciseName="HTML Table Format", Mark=5 },
                                         new TraineeScore {TopicName="CSS",ExerciseName="Colors and Styles", Mark=4 },
                                         new TraineeScore {TopicName="JavaScript",ExerciseName="Cookies", Mark=5 },
                                         new TraineeScore {TopicName="C#",ExerciseName="String Operations", Mark=4 },
                                         new TraineeScore {TopicName="C#",ExerciseName="List and Properties", Mark=5 },
                                         new TraineeScore {TopicName="MVC",ExerciseName="Controllers", Mark=4 }
                                     }
                }
            };
            return traineeDetails;
        }
    }
}