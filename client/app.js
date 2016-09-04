var app = angular.module('Webdxd',[]); 

app.controller('AppCtrl', function($http){
	var app = this;
	app.addNewButton = "Add New";
	$http.get('http://localhost:3000/student').success(function(student){
		app.student =student;
	});
	
	app.selectStudent = function(student){
		if(app.selectedStudent && student.firstName === app.selectedStudent.firstName){
			app.selectedStudent="";
		}else{
			console.log(student);
			$http.get('http://localhost:3000/student/'+ student._id).success(function(studentDetail){
				app.selectedStudent = studentDetail;
				app.selectedStudent.fullName = app.selectedStudent.firstName + ' ' + app.selectedStudent.lastName
			});
		}

	};


	app.addNew = function(){
		app.addMode =!app.addMode;
		app.addNewButton = app.addMode ? "Close" : "Add New";
		app.newStudent = null;

	};

	app.submitForm= function(){
		console.log(app.newStudent);
		$http.post('http://localhost:3000/new', app.newStudent)
			.success(function(newStudent){
				app.student.push(newStudent);
				app.addNew();
		});
	};





});
