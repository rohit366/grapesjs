
define(function(require) {

    return {
      run : function(){
          describe('E2E tests', function() {

            before(function () {
              this.$fixtures  = $("#fixtures");
              this.$fixture   = $('<div id="csscomposer-fixture"></div>');
            });

            beforeEach(function () {
              this.Grapes = require('editor/main');
              this.gjs = new this.Grapes({
                stylePrefix: '',
                storageType: 'none',
                storageManager: { storageType: 'none', },
                assetManager: { storageType: 'none', },
                container: 'csscomposer-fixture',
              });
              this.cssc = this.gjs.editor.get('CssComposer');
              this.clsm = this.gjs.editor.get('ClassManager');
              this.$fixture.empty().appendTo(this.$fixtures);
              this.gjs.render();
              this.rulesSet = [
                { selectors: [{name: 'test1'}, {name: 'test2'}] },
                { selectors: [{name: 'test2'}, {name: 'test3'}] },
                { selectors: [{name: 'test3'}] }
              ];
            });

            afterEach(function () {
              delete this.Grapes;
              delete this.gjs;
              delete this.cssc;
              delete this.clsm;
            });

            after(function () {
              this.$fixture.remove();
            });

            it('Rules are correctly imported from default property', function() {
              var gj = new this.Grapes({
                stylePrefix: '',
                storageType: 'none',
                storageManager: { storageType: 'none', },
                assetManager: { storageType: 'none', },
                cssComposer: { defaults: this.rulesSet},
                container: 'csscomposer-fixture',
              });
              var cssc = gj.editor.get('CssComposer');
              cssc.getRules().length.should.equal(this.rulesSet.length);
              var cls = gj.editor.get('ClassManager').getClasses();
              cls.length.should.equal(3);
            });


            it('New rule adds correctly the class inside classe manager', function() {
              var rules = this.cssc.getRules();
              rules.add({ selectors: [{name: 'test1'}] });
              this.clsm.getClasses().at(0).get('name').should.equal('test1');
            });

            it('New rules are correctly imported inside classe manager', function() {
              var rules = this.cssc.getRules();
              this.rulesSet.forEach(function(item){
                rules.add(item);
              });
              var cls = this.clsm.getClasses();
              cls.length.should.equal(3);
              cls.at(0).get('name').should.equal('test1');
              cls.at(1).get('name').should.equal('test2');
              cls.at(2).get('name').should.equal('test3');
            });

        });
      }
    };

});