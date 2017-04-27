/*
	The purpose of this test is to evaluate your C# knowledge by gathering and displaying the information required in the Main method.
	Complete the provided questions by completing the two models and the repositories.

	Add fields to the Team and Player classes based on the information required from the problems in the 
	Main method. Also, create an instance of Table with at least three teams and at least three players each.
	
	An example of what a team could look like:
		Carolina Panthers
		[Cam Newton, Greg Olsen, Luke Kuechly, ...]
		
*/

using System;
using System.Collections.Generic;
using System.Linq;

public class Program
{
    public static void Main()
    {
        // 1. List out the location and team name of all teams, sorted by location alphabetically, in the format "Name, Location"

        // Your code here
        //Add Teams to the Table
        Table _table = new Table();
        _table.AddTeam(new Team {
                Name = "Star Fleet",
                Location = "Earth",
                Players = new List<Player>() {
                    new Player
                    {
                        FirstName = "James",
                        LastName = "Kirk",
                        Age = 35
                    },
                    new Player
                    {
                        FirstName = "Mr.",
                        LastName = "Spock",
                        Age = 35
                    },
                    new Player
                    {
                        FirstName = "Pavel",
                        LastName = "Chekov",
                        Age = 25
                    },
                    new Player
                    {
                        FirstName = "Hikaru",
                        LastName = "Sulu",
                        Age = 25
                    },
                    new Player
                    {
                        FirstName = "Leonard",
                        LastName = "McCoy",
                        Age = 45
                    },
                }
            });
            _table.AddTeam(new Team
            {
                Name = "Empire",
                Location = "Death Star",
                Players = new List<Player>() {
                    new Player
                    {
                        FirstName = "Darth",
                        LastName = "Vader",
                        Age = 40
                    },
                    new Player
                    {
                        FirstName = "Darth",
                        LastName = "Maul",
                        Age = 25
                    },
                    new Player
                    {
                        FirstName = "Darth",
                        LastName = "Sideous",
                        Age = 65
                    },
                    new Player
                    {
                        FirstName = "Count",
                        LastName = "Dooku",
                        Age = 65
                    },
                }
            });
            _table.AddTeam(new Team
            {
                Name = "Klingons",
                Location = "Kronos",
                Players = new List<Player>() {
                    new Player
                    {
                        FirstName = "Mr",
                        LastName = "Worf",
                        Age = 35
                    },
                    new Player
                    {
                        FirstName = "Chancellor",
                        LastName = "Gowron",
                        Age = 45
                    },
                    new Player
                    {
                        FirstName = "Emmisary",
                        LastName = "K'Ehleyr",
                        Age = 26
                    },
                }
            });

        ITeamRepository _teamRepository = new TeamRepository(_table);

        _teamRepository.GetTeams((teams) => {
            Console.WriteLine("Get Teams Sorted by Location: ");
            foreach (var team in teams.OrderBy(t => t.Location))
            {
                Console.WriteLine("   " + team.Name + ", " + team.Location);
            }
            Console.WriteLine("");
        });

        //// 2. List all players under the age of 26 grouped by team.

        //// Your code here
        _teamRepository.GetTeams((teams) => {
            Console.WriteLine("Get Players Under 26: ");
            foreach (var team in teams)
            {
                Console.WriteLine("   " + team.Name + ":");
                var players = team.Players.Where(p => p.Age < 26);
                foreach (var player in players)
                {
                    Console.WriteLine("      " + player.FirstName + " " + player.LastName + " - " + player.Age);
                }
            }
            Console.WriteLine("");
        });

        //// 3. Print the team name & first and last name of the oldest player on each team.

        //// Your code here
        _teamRepository.GetTeams((teams) => {
            Console.WriteLine("Get Oldest Players per Team: ");
            foreach (var team in teams)
            {
                Console.WriteLine("   " + team.Name + ":");
                var maxage = team.Players.Max(p => p.Age);
                var players = team.Players.FindAll(p => p.Age == maxage);
                foreach (var player in players)
                {
                    Console.WriteLine("      " + player.FirstName + " " + player.LastName + " - " + player.Age);
                }
            }
            Console.WriteLine("");
        });

        Console.WriteLine("2017 - Jamey Stiles");
        Console.ReadLine();
    }
}

// The purpose of a repository is to get information stored in the Table class, which has been provided.  
// ITeamRepository should have a GetTeams method, which is implemented in the 
// TeamRepository class.

interface ITeamRepository
{
    // Your code here
    void GetTeams(Action<List<Team>> lambda);
}

class TeamRepository : ITeamRepository
{
    private Table _table;

    public TeamRepository(Table table)
    {
        this._table = table;
    }

    // Your code here
    public void GetTeams(Action<List<Team>> lambda)
    {
        lambda(_table.QueryTeams());
    }
}

class Table
{
    private readonly List<Team> _teams;
    private int _nextTeamId;

    public Table()
    {
        this._teams = new List<Team>();
        this._nextTeamId = 0;
    }

    public void AddTeam(Team team)
    {
        team.Id = ++this._nextTeamId;
        this._teams.Add(team);
    }

    public List<Team> QueryTeams()
    {
        return _teams;
    }

    public Team GetTeam(int Id)
    {
        return _teams.Find(t => t.Id == Id);
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
