'use strict';
import kMeans from 'node-kmeans';
function eventService(networkService, familyService, volunteerService, locationService) {

  this.getAllVolunteers = volunteerService.getAllVolunteers;
  this.getAllFamilies = familyService.getAllFamilies;
  this.fabCreateNewEvent = true;
  this.disableFabNewEvent = function() {
    this.fabCreateNewEvent = false;
  }
  this.enableFabNewEvent = function() {
    this.fabCreateNewEvent = true;
  }
  this.getFabNewEventStatus = function() {
    return this.fabCreateNewEvent;
  }
  this.getData = function(id) {
    return networkService.GET('events/' + id)
  }
  this.getPastEvents = function() {
    return this.getEventsByState('close')
  }
  this.getCurrentEvent = function() {
    return this.getEventsByState('ongoing').then(results => {
      return results[0]
    })
  }
  this.getFeauterEvents = function() {
    return this.getEventsByState('upcoming')
  }
  this.getEventsByState = function(state) {
    return networkService.GET('events/byState/' + state)
  }
  this.getSketchEvent = function() {
    return this.getEventsByState('sketch')
      .then(events => {
        return events[0]
      })
      .then(attachRoutes)
      .then(attachNonAttachhedFamilies)
      .then(attachNonAttachedVolunteers)
  }
  this.getRoutesForSketch = function(sketchId) {
    return networkService.GET('routes/parent/' + sketchId)
  }
  this.updateNonAttachedFamiliesAndVolunteers = function(sketchId, families, volunteers) {
    return networkService.PUT('events', sketchId, {
      nonAttachhedFamilies: families,
      nonAttachedVolunteers: volunteers
    })
  }

  this.createSketch = function(routes, nonAttachedVolunteers, nonAttachhedFamilies) {
    return networkService.POST('events', {
      state: 'sketch'
    })
  }
  this.attachRouteToEvent = function(eventSketch, justCreatedRoute) {
    return networkService.POST('events/addRoute/' + eventSketch._id, {
        route: justCreatedRoute
      })
      .then(route => {
        return makeResource(route)
      })
  }
  this.updateSketch = function(sketchId, data) {
    return networkService.PUT('events', sketchId, data)
  }

  this.clusterize = function(families, volunteers){
    let vectors = new Array();
    families.forEach(f => {
      let ll = f.address.latlng;
      vectors.push([ll.lat, ll.lng, f])
    })
    volunteers.forEach(v => {
      let ll = v.address.latlng;
      vectors.push([ll.lat, ll.lng, v])
    })
    kMeans.clusterize(vectors, {k: 4}, (err,res) => {
      if (err) console.error(err);
      else console.log('%o',res);
    });
  }

  function attachFamilies(route) {
    if (!route) {
      return
    }
    let p = []
    for (var i = 0; i < route.families.length; i++) {
      p.push(familyService.getFamilyById(route.families[i]))
    }
    return Promise.all(p).then((results) => {
      route.families = results
      return route;
    })
  }

  function attachVolunteers(route) {
    if (!route) {
      return
    }
    let p = []
    for (var i = 0; i < route.volunteers.length; i++) {
      p.push(volunteerService.getVolunteerById(route.volunteers[i]))
    }
    return Promise.all(p).then((results) => {
      route.volunteers = results
      return route;
    })
  }

  function attachRoutes(sketch) {
    if (!sketch) {
      return
    }
    let p = [];
    for (var i = 0; i < sketch.routes.length; i++) {
      p.push(getRouteById(sketch.routes[i]) /*.then(attachFamilies).then(attachVolunteers)*/ )
    }
    return Promise.all(p).then((results) => {
      sketch.routes = results
      return sketch;
    })
  }

  function getRouteById(id) {
    if (!id) {
      return
    }
    return networkService.GET('routes/' + id).then(route => {
      return makeResource(route)
    })
  }
  this.getRouteById = getRouteById

  function attachNonAttachhedFamilies(sketch) {
    if (!sketch) {
      return
    }
    let p = [];
    for (var i = 0; i < sketch.nonAttachedVolunteers.length; i++) {
      p.push(volunteerService.getVolunteerById(sketch.nonAttachedVolunteers[i]))
    }
    return Promise.all(p).then((results) => {
      sketch.nonAttachedVolunteers = results
      return sketch;
    })
  }

  function attachNonAttachedVolunteers(sketch) {
    if (!sketch) {
      return
    }
    let p = [];
    for (var i = 0; i < sketch.nonAttachhedFamilies.length; i++) {
      p.push(familyService.getFamilyById(sketch.nonAttachhedFamilies[i]))
    }
    return Promise.all(p).then((results) => {
      sketch.nonAttachhedFamilies = results
      return sketch;
    })
  }

  function makeResource(route) {
    route.$update = function() {
      return networkService.PUT('routes/push', route._id, route)
    }
    route.$delete = function() {
      return networkService.DELETE('routes', route._id)
    }
    return route
  }
}

export default {
  service: ['networkService', 'familyService', 'volunteerService', 'locationService', eventService],
  name: 'eventService'
}
