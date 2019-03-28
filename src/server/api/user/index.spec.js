/* globals sinon, describe, expect, it */

import {describe, expect, it} from '@angular/core/testing/src/testing_internal';

const proxyquire = require('proxyquire').noPreserveCache();

const userCtrlStub = {
  index: 'userCtrl.index',
  destroy: 'userCtrl.destroy',
  me: 'userCtrl.me',
  changePassword: 'userCtrl.changePassword',
  show: 'userCtrl.show',
  create: 'userCtrl.create'
};

const authServiceStub = {
  isAuthenticated() {
    return 'authService.isAuthenticated';
  },
  hasRole(role) {
    return `authService.hasRole.${role}`;
  }
};

const routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
const userIndex = proxyquire('./index', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './user.controller': userCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('User API Router:', function () {
  it('should return an express router instance', function () {
    expect(userIndex).to.equal(routerStub);
  });

  describe('GET /api/users', function () {
    it('should verify admin role and route to user.controller.index', function () {
      expect(routerStub.get
        .withArgs('/', 'authService.hasRole.admin', 'userCtrl.index')
      ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/users/:id', function () {
    it('should verify admin role and route to user.controller.destroy', function () {
      expect(routerStub.delete
        .withArgs('/:id', 'authService.hasRole.admin', 'userCtrl.destroy')
      ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/users/me', function () {
    it('should be authenticated and route to user.controller.me', function () {
      expect(routerStub.get
        .withArgs('/me', 'authService.isAuthenticated', 'userCtrl.me')
      ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/users/:id/password', function () {
    it('should be authenticated and route to user.controller.changePassword', function () {
      expect(routerStub.put
        .withArgs('/:id/password', 'authService.isAuthenticated', 'userCtrl.changePassword')
      ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/users/:id', function () {
    it('should be authenticated and route to user.controller.show', function () {
      expect(routerStub.get
        .withArgs('/:id', 'authService.isAuthenticated', 'userCtrl.show')
      ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/users', function () {
    it('should route to user.controller.create', function () {
      expect(routerStub.post
        .withArgs('/', 'userCtrl.create')
      ).to.have.been.calledOnce;
    });
  });
});
