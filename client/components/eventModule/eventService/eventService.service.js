'use strict';

function eventService(networkService, familyService, volunteerService, CacheFactory) {
  this.sketchCache = null;
  if (!CacheFactory.get('sketchCache')) {
    // or CacheFactory('bookCache', { ... });
    this.sketchCache = CacheFactory.createCache('sketchCache', {
      deleteOnExpire: 'aggressive',
      recycleFreq: 60000
    });
  }
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

  this.getCacheSketch = function() {
    let keys = this.sketchCache.keys();
    let sketch = {
      routes: [],
      nonAttachedVolunteers: [],
      nonAttachhedFamilies: []
    };
    keys.forEach(key => {
      if (/families/.test(key)) {
        sketch.nonAttachhedFamilies.push(this.sketchCache.get(key))
      } else if (/volunteers/.test(key)) {
        sketch.nonAttachedVolunteers.push(this.sketchCache.get(key))
      } else if (/routes/.test(key)) {
        sketch.routes.push(this.sketchCache.get(key))
      } else {
        throw key
      }
    })
    return sketch;
  }
  this.setCacheSketch = function(sketch) {
    this.sketchCache.removeAll()
    sketch.routes.forEach(route => {
      this.sketchCache.put('/routes/' + route._id, route)
    })
    sketch.nonAttachhedFamilies.forEach(family => {
      this.sketchCache.put('/families/' + family._id, family)
    })
    sketch.nonAttachedVolunteers.forEach(volunteer => {
      this.sketchCache.put('/volunteers/' + volunteer._id, volunteer)
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
        route.$update = () => {
          return networkService.PUT('routes', route._id, this)
        }
        return route;
      })
      .then(attachFamilies)
      .then(attachVolunteers)
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
      p.push(getRouteById(sketch.routes[i]).then(attachFamilies).then(attachVolunteers))
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
        route.$update = function(){
          console.log(route);
          return networkService.PUT('routes',route._id,route)
        }
      return route
    })
  }

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

  this.getRoutesForSketch = function(sketchId) {
    return networkService.GET('routes/parent/' + sketchId)
  }
  this.updateNonAttachedFamiliesAndVolunteers = function(sketchId, families, volunteers) {
    let nonAttachhedFamilies = [];
    let nonAttachedVolunteers = [];
    families.forEach(f => {
      nonAttachhedFamilies.push(f._id)
    })
    volunteers.forEach(v => {
      nonAttachedVolunteers.push(v._id)
    })
    return networkService.PUT('events', sketchId, {
      nonAttachhedFamilies,
      nonAttachedVolunteers
    })
  }
}

export default {
  service: ['networkService', 'familyService', 'volunteerService', 'CacheFactory', eventService],
  name: 'eventService'
}
