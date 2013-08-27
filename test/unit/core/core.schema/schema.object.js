var Waterline = require('../../../../lib/waterline'),
    assert = require('assert');

describe('Core Schema', function() {

  describe('with object attribute', function() {
    var person;

    before(function(done) {
      var waterline = new Waterline();

      var Person = Waterline.Collection.extend({
        identity: 'person',
        attributes: {
          first_name: { type: 'STRING' },
          last_name: { type: 'STRING' },
          phone: {
            type: 'STRING',
            defaultsTo: '555-555-5555'
          }
        }
      });

      waterline.loadCollection(Person);
      waterline.initialize({ adapters: { }}, function(err, colls) {
        if(err) return done(err);
        person = colls.person;
        done();
      });
    });

    it('should set internal schema attributes', function() {
      assert(person._schema.schema.first_name);
      assert(person._schema.schema.last_name);
    });

    it('should lowercase attribute types', function() {
      assert(person._schema.schema.first_name.type === 'string');
    });

    it('should set defaultsTo value', function() {
      assert(person._schema.schema.phone.defaultsTo === '555-555-5555');
    });
  });

});
