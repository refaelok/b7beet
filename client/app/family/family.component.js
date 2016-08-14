export class FamilyController {
  constructor($uibModal, familyService, $scope, socket){
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
      this.socket.syncUpdates('family', this.families);
    })
  }

  onNewFamilyButtonClick(){
    this.openDialogToAddNewFamily()
  }

  openDialogToAddNewFamily(){
    this.newFamilyModel = this.$uibModal.open({
      animation: true,
      template: require('../../components/familyForm/familyForm.html'),
      controller: ['$uibModalInstance', FamilyFormController],
      size: 'lg',
      controllerAs: '$ctrl'
    })
    this.newFamilyModel.result.then(this.addFamily.call(this))
  }

  addFamily(){
    let ctrl = this;
    return function(family){
      ctrl.familyService.addNewFamily(family).then(a => {console.log(a);})
    }
  }

  onFamilyClicked(family){
    this.$uibModal.open({
      animation: true,
      template: require('../../components/familyInfo/familyInfo.html'),
      size: 'lg',
      controllerAs: '$ctrl',
      controller: ['$uibModalInstance', 'family', function($uibModalInstance, family){
        this.family = family;
      }],
      resolve: {
        family: function () {
          return family;
        }
      }
    })
  }
}

export default {
  name : 'family',
  component: {
    template: require('./family.html'),
    controller: ['$uibModal', 'familyService', '$scope', 'socket', FamilyController],
  }
}

function FamilyFormController($uibModalInstance){
  const ctrl = this;
  ctrl.$uibModalInstance = $uibModalInstance;
  ctrl.model = {};
  ctrl.model.familyRoles = ['Parent','Child']
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
    age: null,
    phone: null
  }

  ctrl.addAnotherFamilYMember = addAnotherFamilYMember;

  ctrl.createNewFamily = createNewFamily;

  function addAnotherFamilYMember(){
    if(this.model.familyMember.name){
      this.model.family.familyTree.push(this.model.familyMember)
      this.model.familyMember = {
        name: null,
        role: null,
        age: null,
        phone: null
      }
    }
    else{
      // TODO: show alert that at least name must be
      alert('Name field is required')
    }
  }

  function createNewFamily(){
    this.$uibModalInstance.close(this.model.family)
  }
}
