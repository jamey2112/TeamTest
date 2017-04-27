/// <reference path="D:\Software Development\Stiles Projects\TeamTest\TeamTest3\Scripts/angular.js" />

/*
	This test is meant to evaluate your creativity with user interfaces as well as your ability to implement
  AngularJS and any other Javascript/JQuery libraries of your choosing. You are encouraged to be as creative as
  possible with the aesthetics of the page.

	Create a roster page that displays a list of NFL players. Using elements of AngularJS,
  1) Make the list sortable by team and position.
  2) Include a button that reverses the sort direction, and a filter for the range of jersey numbers shown.
  3) Ability to add/remove a player to the players array. Please create a custom confirmation dialog when 
  removing a player.  [NOT a Javascript confirm - ie: confirm('hello');]
  4) Ability to change player names.
  
  Feel free to express yourself and your creative abilities on this test.
*/
(function (ng) {
    var app = ng.module("TestApp", ['angularModalService']);

    app.controller("AddPlayerController", ['$scope', 'close', function($scope, close){
        $scope.Id;
        $scope.Name;
        $scope.Number;
        $scope.Position;
        $scope.Team;

        $scope.add = function() {
            close({$scope}, 500);
        }

        $scope.close = function(result){
            close(result, 500);
        }
    }]);

    app.controller("DeletePlayerController", ['$scope', 'close', function($scope, close){
        $scope.close = function(result){
            close(result, 500);
        }
    }]);
   

    app.controller("TestCtrl", ["$scope", "ModalService", function ($scope, ModalService) {

        $scope.players = [{
            Id: 1,
            Name: "Cam Newton",
            Number: 1,
            Position: "QB",
            Team: "Carolina Panthers"
        }, {
            Id: 2,
            Name: "Luke Kuechly",
            Number: 59,
            Position: "MLB",
            Team: "Carolina Panthers"
        }, {
            Id: 3,
            Name: "Aaron Rodgers",
            Number: 12,
            Position: "QB",
            Team: "Green Bay Packers"
        }, {
            Id: 4,
            Name: "JJ Watt",
            Number: 99,
            Position: "DE",
            Team: "Houston Texans"
        },
        {
            Id: 5,
            Name: "Josh Norman",
            Number: 24,
            Position: "CB",
            Team: "Washington Redskins"
        }
        , {
            Id: 6,
            Name: "Jordy Nelson",
            Number: 87,
            Position: "WR",
            Team: "Green Bay Packers"
        },
        {
            Id: 7,
            Name: "Matt Ryan",
            Number: 2,
            Position: "QB",
            Team: "Atlanta Falcons"
        },
        {
            Id: 8,
            Name: "Julio Jones",
            Number: 11,
            Position: "WR",
            Team: "Atlanta Falcons"
        },
        {
            Id: 9,
            Name: "Devonta Freeman",
            Number: 24,
            Position: "RB",
            Team: "Atlanta Falcons"
        },
        {
            Id: 10,
            Name: "Kelvin Benjamin",
            Number: 13,
            Position: "WR",
            Team: "Carolina Panthers"
        },
        {
            Id: 11,
            Name: "Von Miller",
            Number: 58,
            Position: "OLB",
            Team: "Denver Broncos"
        },
        {
            Id: 12,
            Name: "Thomas Davis",
            Number: 58,
            Position: "OLB",
            Team: "Carolina Panthers"
        }, {
            Id: 13,
            Name: "Drew Brees",
            Number: 9,
            Position: "QB",
            Team: "New Orleans Saints"
        }, {
            Id: 14,
            Name: "Tom Brady",
            Number: 12,
            Position: "QB",
            Team: "New England Patriots"
        }, {
            Id: 15,
            Name: "Rob Gronkowski",
            Number: 87,
            Position: "TE",
            Team: "New England Patriots"
        }, {
            Id: 16,
            Name: "Greg Olsen",
            Number: 88,
            Position: "TE",
            Team: "Carolina Panthers"
        }, {
            Id: 17,
            Name: "Leveon Bell",
            Number: 26,
            Position: "RB",
            Team: "Pittsburgh Steelers"
        }, {
            Id: 18,
            Name: "Antonio Brown",
            Number: 84,
            Position: "WR",
            Team: "Pittsburgh Steelers"
        }, {
            Id: 19,
            Name: "Dak Prescott",
            Number: 4,
            Position: "QB",
            Team: "Dallas Cowboys"
        }, {
            Id: 20,
            Name: "Ezekiel Elliot",
            Number: 21,
            Position: "RB",
            Team: "Dallas Cowboys"
        }
        ];
        $scope.title = "NFL Players";

        //|////////////////////|/
        //|/put your code here/|/
        //V////////////////////V/

        $scope.sortColumn = 'Team';
        $scope.reverseSort = false;
        $scope.rangeMin = 0;
        $scope.rangeMax = 99;
        $scope.Id;
        $scope.Name;
        $scope.Number;
        $scope.Position;
        $scope.Team;
        $scope.editName = false;

        $scope.sortData = function (column) {
            $scope.sortColumn = column;
        }

        $scope.reverseSortFn = function () {
            $scope.reverseSort = !$scope.reverseSort;
        }

        $scope.filterNumber = function (val) {
            return (val.Number >= $scope.rangeMin && val.Number <= $scope.rangeMax);
        }

        $scope.showAddPlayerModal = function() {
            ModalService.showModal({
                template:`<div id="addPlayerModal" class="modal fade">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" ng-click="close(false)" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 class="modal-title">Add New Player</h4>
                            </div>
                            <div class="modal-body">
                                Name:
                                <input class="form-control" type="text" ng-model="Name" />
                                Number:
                                <input class="form-control" type="text" ng-model="Number" />
                                Position:
                                <input class="form-control" type="text" ng-model="Position" />
                                Team:
                                <input class="form-control" type="text" ng-model="Team" />
                            </div>
                            <div class="modal-footer">
                                <button type="button" ng-click="add()" class="btn btn-primary" data-dismiss="modal">Add</button>
                                <button type="button" ng-click="close(-1)" class="btn btn-primary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>`,
                controller: "AddPlayerController"
            }).then(function(modal){
                modal.element.modal();
                modal.close.then(function(result){
                    if(result != -1) {
                        //find the max id
                        var id = 0;
                        for(var i = 0, len = $scope.players.length; i < len; i++ ){
                            var obj = $scope.players[i];
                            if(obj.Id > id) {
                                id = obj.Id;
                            };
                        }
                        $scope.players.push({
                            Id: id + 1,
                            Name: result.$scope.Name,
                            Number: parseInt(result.$scope.Number),
                            Position: result.$scope.Position,
                            Team: result.$scope.Team
                        });
                    };
                });
            });   
        };

        $scope.showDeletePlayerModal = function(id, name) {
            ModalService.showModal({
                template:`<div id="deletePlayerModal" class="modal fade">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" ng-click="close(false)" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 class="modal-title">Delete Player</h4>
                            </div>
                            <div class="modal-body">
                                Are you sure you want to delete player ` + name +  
                            `</div>
                            <div class="modal-footer">
                                <button type="button" ng-click="close(` + id + `)" class="btn btn-primary" data-dismiss="modal">Yes</button>
                                <button type="button" ng-click="close(-1)" class="btn btn-primary" data-dismiss="modal">No</button>
                            </div>
                        </div>
                    </div>
                </div>`,
                controller: "AddPlayerController"
            }).then(function(modal){
                modal.element.modal();
                modal.close.then(function(result){
                    if(result != -1) {
                        for(var i = 0, len = $scope.players.length; i < len; i++ ){
                            var obj = $scope.players[i];
                            if(obj.Id === result){
                                var idx = $scope.players.indexOf(obj);
                                $scope.players.splice(idx, 1);
                                break;
                            }
                        }
                    };
                });
            });   
        };

        //^////////////////////^/
        //|////////////////////|/
        //|////////////////////|/


    }]);

})(window.angular);
/*
When you are done, press the Update button at the top to save your work. Send us the link to your finished jsFiddle
*/