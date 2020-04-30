// processes HTTP requests and defines available endpoints

Contact = require('./model');

// handle index actions
exports.index = function (req, res) {
	Contact.get(function (err, contacts) {
		if (err) {
			res.json ({
				status: "Error",
				message: err
			});
		}
		res.join ({
			status: "success",
			message: "Contacts retrieved successfully",
			data: contacts
		});
	});
};

// handle create contact actions

exports.new = function (req, res) {
	var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;

    // to save the contact and check for errors
    contact.save(function (err) {
    	res.json({
    		message: 'New contact created!',
    		data: contact
    	});
    });
};


// handle view contact info

exports.view = function (req, res) {
	Contact.findById(req.params,contact_id, function (err, contact) {
		if (err)
			res.send(err);
		res.json ({
			message: 'Contact details loading..',
			data: contact
		});
	});
};


// updating contact info
exports.update = function(req, res) {

	Contact.findById(req.params.contact_id, 
	function (err, contact) {
        if (err)
            res.send(err);
			contact.name = req.body.name ? req.body.name : contact.name;
        	contact.gender = req.body.gender;
        	contact.email = req.body.email;
        	contact.phone = req.body.phone;

        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: contact
            });
        });
    });
};


// delete contact
exports.delete = function (req, res) {
    Contact.remove({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err)
            res.send(err);
		res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};