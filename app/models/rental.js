import DS from 'ember-data';

export default DS.Model.extend({
  owner: DS.attr(),
  city: DS.attr(),
  type: DS.attr(),
  image: DS.attr(),
  bedrooms: DS.attr(),
  reviews: DS.hasMany('review', {
    async: true
  }),
  actions: {
    saveReview(params) {
      var newReview = this.store.createRecord('review', params);
      var rental = params.rental;
      rental.get('reviews').addObject(newReview);
      newReview.save().then(function() {
        return rental.save();
      });
      this.transitionTo('rental', rental);
    }

  }
});
