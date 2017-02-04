    $.ajax({url: "/api/allTables", success: function(result){
    	console.log(result)
        for (var i = 0; i < result.length; i++) {
        	if(result[i].available === 0){
        		$('#tableSection').append('<div>' + result[i].reserve_name + '</div>')
        	} else {
        		$('#waitlistSection').append('<div>' + result[i].reserve_name + '</div>')
        	}
        }
    }});

