'use strict';

var app = require('../..');
import request from 'supertest';

var newVolunteer;

describe('Volunteer API:', function() {
  describe('GET /api/volunteers', function() {
    var volunteers;

    beforeEach(function(done) {
      request(app)
        .get('/api/volunteers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          volunteers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(volunteers).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/volunteers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/volunteers')
        .send({
          name: 'New Volunteer',
          info: 'This is the brand new volunteer!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newVolunteer = res.body;
          done();
        });
    });

    it('should respond with the newly created volunteer', function() {
      expect(newVolunteer.name).to.equal('New Volunteer');
      expect(newVolunteer.info).to.equal('This is the brand new volunteer!!!');
    });
  });

  describe('GET /api/volunteers/:id', function() {
    var volunteer;

    beforeEach(function(done) {
      request(app)
        .get(`/api/volunteers/${newVolunteer._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          volunteer = res.body;
          done();
        });
    });

    afterEach(function() {
      volunteer = {};
    });

    it('should respond with the requested volunteer', function() {
      expect(volunteer.name).to.equal('New Volunteer');
      expect(volunteer.info).to.equal('This is the brand new volunteer!!!');
    });
  });

  describe('PUT /api/volunteers/:id', function() {
    var updatedVolunteer;

    beforeEach(function(done) {
      request(app)
        .put(`/api/volunteers/${newVolunteer._id}`)
        .send({
          name: 'Updated Volunteer',
          info: 'This is the updated volunteer!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedVolunteer = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedVolunteer = {};
    });

    it('should respond with the original volunteer', function() {
      expect(updatedVolunteer.name).to.equal('New Volunteer');
      expect(updatedVolunteer.info).to.equal('This is the brand new volunteer!!!');
    });

    it('should respond with the updated volunteer on a subsequent GET', function(done) {
      request(app)
        .get(`/api/volunteers/${newVolunteer._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let volunteer = res.body;

          expect(volunteer.name).to.equal('Updated Volunteer');
          expect(volunteer.info).to.equal('This is the updated volunteer!!!');

          done();
        });
    });
  });

  describe('PATCH /api/volunteers/:id', function() {
    var patchedVolunteer;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/volunteers/${newVolunteer._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Volunteer' },
          { op: 'replace', path: '/info', value: 'This is the patched volunteer!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedVolunteer = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedVolunteer = {};
    });

    it('should respond with the patched volunteer', function() {
      expect(patchedVolunteer.name).to.equal('Patched Volunteer');
      expect(patchedVolunteer.info).to.equal('This is the patched volunteer!!!');
    });
  });

  describe('DELETE /api/volunteers/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/volunteers/${newVolunteer._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when volunteer does not exist', function(done) {
      request(app)
        .delete(`/api/volunteers/${newVolunteer._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
