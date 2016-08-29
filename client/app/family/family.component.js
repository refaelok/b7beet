export class FamilyController {
  constructor($uibModal, familyService, $scope, socket, Auth) {
    this.familyService = familyService;
    this.$uibModal = $uibModal;
    this.socket = socket;
    this.families = [];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('family');
    });
  }

  $onInit() {
    this.familyService.getAllFamilies()
      .then(families => {
        this.families = families;
        this.socket.syncUpdates('family', this.families,(a,b,c) => {
        });
      })
  }

  onNewFamilyButtonClick() {
    this.openDialogToAddNewFamily()
  }

  openDialogToAddNewFamily() {
    this.newFamilyModel = this.$uibModal.open({
      animation: true,
      template: require('../../components/familyForm/familyForm.html'),
      controller: ['$uibModalInstance', FamilyFormController],
      size: 'lg',
      controllerAs: '$ctrl'
    })
    this.newFamilyModel.result.then(this.addFamily.call(this))
  }

  addFamily() {
    let ctrl = this;
    return function(family) {
      ctrl.familyService.addNewFamily(family);
    }
  }

  removeFamily(family) {
    let ctrl = this;
    ctrl.familyService.removeFamily(family)
  }

  updateFamily(updateObj) {
    let ctrl = this;
    console.log(updateObj);
    ctrl.familyService.updateFamily(updateObj.new)

  }

  onFamilyClicked(family) {
    this.familyInfo = this.$uibModal.open({
      animation: true,
      template: require('../../components/familyInfo/familyInfo.html'),
      size: 'lg',
      controllerAs: '$ctrl',
      controller: ['$uibModalInstance', 'family', 'NgMap', 'Auth', function($uibModalInstance, family, NgMap, Auth) {
        this.NgMap = NgMap;
        this.family = family;
        this.u_family = _.cloneDeep(family)
        this.hasRole = Auth.hasRoleSync;
        this.$uibModalInstance = $uibModalInstance;
        NgMap.getMap()
          .then(map => {
            google.maps.event.trigger(map, "resize");
            map.setZoom(15);
          })
          .catch(a => {
            console.log(a)
          })
        this.saveFamily = function() {
          this.$uibModalInstance.close({
            operation: 'update',
            reference: {
              new: this.u_family,
              old: this.family
            }
          })
        }
        this.removeFamilyMember = function(index){
          this.u_family.familyTree.splice(index,1);
        }
        this.removeFamily = function(family) {
          this.$uibModalInstance.close({
            operation: 'remove',
            reference: this.family
          })
        }
        this.close = function() {
          this.$uibModalInstance.close({
            operation: 'close',
            reference: this.u_family
          })
        }
      }],
      resolve: {
        family: function() {
          return family;
        }
      }
    })
    this.familyInfo.result.then(switchOnOperation.call(this))

    function switchOnOperation() {
      let ctrl = this;
      return function(object) {
        if (object.operation === 'remove') {
          ctrl.removeFamily.call(ctrl,object.reference)
        } else if (object.operation === 'update') {
          ctrl.updateFamily.call(ctrl, object.reference)
        } else if (object.operation === 'close') {}
      }
    }
  }
}

export default {
  name: 'family',
  component: {
    template: require('./family.html'),
    controller: ['$uibModal', 'familyService', '$scope', 'socket', 'Auth', FamilyController],
  }
}

function FamilyFormController($uibModalInstance) {
  const ctrl = this;
  ctrl.$uibModalInstance = $uibModalInstance;
  ctrl.model = {};
  ctrl.model.familyRoles = ['Parent', 'Child']
  ctrl.model.family = {
    name: null,
    address: null,
    details: "Addition data",
    contact: {
      name: null,
      phone: null,
      details: "Addition data"
    },
    familyTree: []
  }
  ctrl.model.familyMember = {
    name: null,
    role: null,
    birthDate: null,
    phone: null
  }

  ctrl.addAnotherFamilYMember = addAnotherFamilYMember;

  ctrl.createNewFamily = createNewFamily;

  function addAnotherFamilYMember() {
    if (this.model.familyMember.name) {
      this.model.family.familyTree.push(this.model.familyMember)
      this.model.familyMember = {
        name: null,
        role: null,
        birthDate: null,
        phone: null
      }
    } else {
      // TODO: show alert that at least name must be
      alert('Name field is required')
    }
  }

  function createNewFamily() {
    if (this.model.familyMember.name)
      this.model.family.familyTree.push(this.model.familyMember)
    this.$uibModalInstance.close(this.model.family)
  }
}
