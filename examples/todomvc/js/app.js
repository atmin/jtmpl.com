(function () {
  'use strict';

  // Enter pressed?
  function enterKey(e) {
    return 13 === (e.keyCode ? e.keyCode : e.which);
  }

  // Utility function
  function returnTrue() {
    return true;
  }

  // Route handling (currently no `routes` plugin)
  function hashchange() {
    this('filters').values.map(function(el, i) {
      if (location.hash === el.href) {
        this('filters')(i)('selected', true);
        currentFilter = el.filter;
      }
      else {
        this('filters')(i)('selected', false);
      }
    }, this);
    // Update todo items on route change
    jtmpl('#todoapp').trigger('change', 'todos');
  }

  // Detached computed property, attached to each todo item
  function applyCurrentFilter() {
    return currentFilter.call(this);
  }

  // Currently selected filter
  var currentFilter = returnTrue;

  // Persist todos to localStorage
  function persist() {
    localStorage.setItem('todomvc-jtmpl', jtmpl('#todoapp')('todos').toJSON());
  }

  function setupPersistence() {
    var todos = jtmpl('#todoapp')('todos');
    todos.on('update', persist);
    todos.on('insert', persist);
    todos.on('delete', persist);
  }

  // Retrieve todos from localStorage
  function retrieve() {
    var todos = JSON.parse(localStorage.getItem('todomvc-jtmpl') || '[]')
      .map(function(el) {
        // Attach filter function
        el.filter = applyCurrentFilter;
        return el;
      });
    jtmpl('#todoapp')('todos', todos);
  }

  function destroy() {
    var todos = this.root('todos');
    todos.splice(todos.values.indexOf(this.values), 1);
  }

  // Export template model
  module.exports = {

    //// Event handlers via event delegation (`on` plugin)
    __on__: {

      keypress: {
        '#new-todo': function(e) {
          // Enter pressed on non-empty field?
          if (enterKey(e) && this('todo')) {
            this('todos').push({
              title: this('todo'),
              completed: false,
              filter: applyCurrentFilter
            });
            this('todo', '');
          }
        },
        '.edit': function(e) {
          if (enterKey(e)) {
            // If todo empty, destroy it
            if (this('title') === '') {
              destroy.call(this);
            }
            else {
              this('_editing', false);
            }
          }
        }
      },

      click: {
        '.destroy': destroy,
        '#clear-completed': function() {
          for (var i = this('todos').len - 1; i >= 0; i--) {
            if (this('todos')(i)('completed')) {
              this('todos').splice(i, 1);
            }
          }
        }
      },

      dblclick: {
        '#todo-list label': function() {
          // Finish any editing
          this.root('todos').values.map(function(el, i) {
            this.root('todos')(i)('_editing', false);
          }, this);
          // Enter edit mode for current todo
          this('_editing', true);
        }
      }
    },

    //// Initialization
    __init__: function() {
      var routeChange = hashchange.bind(this);
      window.addEventListener('hashchange', routeChange);
      // Wait jtmpl to initialize the DOM
      setTimeout(function() {
        retrieve();
        routeChange();
        setupPersistence();
      });
    },

    //// Fields

    // What needs to be done?
    todo: '',
    // All todo items
    todos: [],

    // Computed properties
    todosLength: function() {
      return this('todos').len;
    },
    completedItemsLength: function() {
      return this('todos').values.reduce(
        function (prev, curr) {
          return prev + (curr.completed && 1 || 0);
        }, 0);
    },
    todosLeft: function() {
      return this('todosLength') - this('completedItemsLength');
    },
    itemText: function() {
      return this('todosLeft') === 1 ? 'item' : 'items';
    },
    toggleAll: function(newVal) {
      if (typeof newVal === 'boolean') {
        // Setter
        this('todos').values.map(function(el, i) {
          this('todos')(i)('completed', newVal);
        }, this);
        // Current limitation is setters do not track changes automatically
        this.trigger('change', 'todos');
      }
      else {
        // Getter
        return this('todosLeft') === 0;
      }
    },

    // Filter list
    filters: [
      {
        selected: false,
        href: '#/',
        title: 'All',
        filter: returnTrue
      },
      {
        selected: false,
        href: '#/active',
        title: 'Active',
        filter: function() { return !this('completed'); }
      },
      {
        selected: false,
        href: '#/completed',
        title: 'Completed',
        filter: function() { return this('completed'); }
      }
    ]

  }

})();
