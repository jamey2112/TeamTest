using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeamTest4
{
    class Program
    {
        static void Main(string[] args)
        {
            Test test = new Test();
            //test.Test1();

            //test.Test2(
            //    (i) => Console.WriteLine(i * 3)
            //    );


            test.Test3((teams) => {
                    Console.WriteLine("Get Teams Sorted by Location: ");
                    foreach (var team in teams.OrderBy(t => t.Location))
                    {
                        Console.WriteLine("   " + team.Name + ", " + team.Location);
                    }
                });


            Console.ReadKey();
        }
    }

    class Test
    {
        public List<Team> teams = new List<Team>(); 
        
        public Test()
        {
            Team team1 = new Team()
            {
                Id = 0,
                Location = "Wilmington",
                Name = "Team1",
                Players = null
            };
            teams.Add(team1);
            Team team2 = new Team()
            {
                Id = 1,
                Location = "Mooresville",
                Name = "Team2",
                Players = null
            };
            teams.Add(team2);
        }

        public void Test1()
        {
            Console.WriteLine("Hello");
            Console.ReadKey();
        }

        public void Test2(Action<int> lambda)
        {
            for(var i = 1; i <= 5; i++ )
            {
                lambda(i);
            }
        }

        public void Test3(Action<List<Team>> lambda)
        {
            lambda(teams);
        }

    }

    class Team
    {
        public int Id { get; set; }
        // Your code here
        public string Name { get; set; }
        public string Location { get; set; }
        public List<Player> Players { get; set; }
    }

    class Player
    {
        // Your code here
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
    }

}
