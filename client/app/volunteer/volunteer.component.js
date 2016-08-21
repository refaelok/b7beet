export class volunteerController {
  constructor(socket, $scope) {

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('volunteer');
    });
  }

  $onInit() {

  }

}

export default {
  name: 'volunteer',
  component: {
    template: require('./volunteer.html'),
    controller: ['socket', '$scope',volunteerController],
  }
}
