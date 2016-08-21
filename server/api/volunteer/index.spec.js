'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var volunteerCtrlStub = {
  index: 'volunteerCtrl.index',
  show: 'volunteerCtrl.show',
  create: 'volunteerCtrl.create',
  upsert: 'volunteerCtrl.upsert',
  patch: 'volunteerCtrl.patch',
  destroy: 'volunteerCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var volunteerIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './volunteer.controller': volunteerCtrlStub
});

describe('Volunteer API Router:', function() {
  it('should return an express router instance', function() {
    expect(volunteerIndex).to.equal(routerStub);
  });

  describe('GET /api/volunteers', function() {
    it('should route to volunteer.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'volunteerCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/volunteers/:id', function() {
    it('should route to volunteer.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'volunteerCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/volunteers', function() {
    it('should route to volunteer.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'volunteerCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/volunteers/:id', function() {
    it('should route to volunteer.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'volunteerCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/volunteers/:id', function() {
    it('should route to volunteer.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'volunteerCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/volunteers/:id', function() {
    it('should route to volunteer.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'volunteerCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
