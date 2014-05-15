should = require('chai').should()
SandboxedModule = require('sandboxed-module')
assert = require('assert')
path = require('path')
sinon = require('sinon')
modulePath = path.join __dirname, "../../../../app/js/Features/PasswordReset/PasswordResetHandler"
expect = require("chai").expect

describe "PasswordResetHandler", ->

	beforeEach ->

		@settings = 
			siteUrl: "www.sharelatex.com"
		@TokenGenerator =
			getNewToken:sinon.stub()
			getUserIdFromToken:sinon.stub()
		@UserGetter =
			getUser:sinon.stub()
		@EmailHandler = 
			sendEmail:sinon.stub()
		@AuthenticationManager =
			setUserPassword:sinon.stub()
		@PasswordResetHandler = SandboxedModule.require modulePath, requires:
			"../User/UserGetter": @UserGetter
			"./TokenGenerator": @TokenGenerator
			"../Email/EmailHandler":@EmailHandler
			"../Authentication/AuthenticationManager":@AuthenticationManager
			"settings-sharelatex": @settings
			"logger-sharelatex": log:->
		@token = "12312321i"
		@user_id = "user_id_here"
		@user = 
			email :"bob@bob.com"
		@password = "my great secret password"


	describe "generateAndEmailResetToken", ->

		it "should check the user exists", (done)->
			@UserGetter.getUser.callsArgWith(1)
			@TokenGenerator.getNewToken.callsArgWith(1)
			@PasswordResetHandler.generateAndEmailResetToken @user_id, (err)->
				err.should.exists
				done()


		it "should send the email with the token", (done)->

			@UserGetter.getUser.callsArgWith(1, null, @user)
			@TokenGenerator.getNewToken.callsArgWith(1, null, @token)
			@EmailHandler.sendEmail.callsArgWith(2)
			@PasswordResetHandler.generateAndEmailResetToken @user_id, (err)=>
				@EmailHandler.sendEmail.called.should.equal true
				args = @EmailHandler.sendEmail.args[0]
				args[0].should.equal "passwordResetRequested"
				args[1].setNewPasswordUrl.should.equal "#{@settings.siteUrl}/user/password/set?resetToken=#{@token}"
				done()


	describe "setNewUserPassowrd", ->

		it "should return err if no user id can be found", (done)->
			@TokenGenerator.getUserIdFromToken.callsArgWith(1)
			@PasswordResetHandler.setNewUserPassowrd @token, @password, (err)=>
				err.should.exists
				@AuthenticationManager.setUserPassword.called.should.equal false
				done()		

		it "should set the user password", (done)->
			@TokenGenerator.getUserIdFromToken.callsArgWith(1, null, @user_id)
			@AuthenticationManager.setUserPassword.callsArgWith(2)
			@PasswordResetHandler.setNewUserPassowrd @token, @password, (err)=>
				@AuthenticationManager.setUserPassword.calledWith(@user_id, @password).should.equal true
				done()			

