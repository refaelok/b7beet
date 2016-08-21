export class VolunteerListController{
  constructor($scope) {
    const ctrl = this;
    ctrl.$scope = $scope;
    ctrl.model = {};
  }

  $onInit(){
    // TODO: implement later
    this.$scope.$on('accordionA:onReady', function () {
      // console.log('accordionA is ready!');
    });
  }

  $onChanges(changesObj) {
    this.model.list = changesObj.list.currentValue
  }

  expandCallback (index, id) {
    // console.log('expand:', index, id);
  };

  collapseCallback (index, id) {
    // console.log('collapse:', index, id);
  };

}

export default {
  component: {
    template: require('./volunteerList.html'),
    controller: ['$scope', VolunteerListController],
    bindings: {
      list: '<'
    }
  },
  name: 'volunteerList'
}
