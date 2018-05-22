$(function() {

  function randomString() {
    const chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    let str = '';
    for (let i = 0; i < 10 ; i++) {
      str += chars[Math.floor(Math.random() * chars.length)]; // = np chars[12]
    }
    return str;
  }

  function Column(name) {
    const self = this;
    this.id = randomString(); 
    this.name = name;
    this.$element = createColumn();
  
    function createColumn() {
      const $column = $('<div>').addClass('column');
      const $columnTitle = $('<h2>').addClass('column-title').text(self.name);
      const $columnCardList = $('<ul>').addClass('column-card-list');
      const $columnDelete = $('<button>').addClass('btn-delete').text('X');
      const $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');

      $columnDelete.click(function() {
        self.removeColumn();
      });

      $columnAddCard.click(function() {
        self.addCard(new Card(prompt('Podaj nazwę karty')));
      });

      $column.append($columnTitle);
      $column.append($columnDelete);
      $column.append($columnAddCard);
      $column.append($columnCardList);
      return $column;
    }
  }

  Column.prototype.addCard = function(card) {
    this.$element.children('ul').append(card.$element);
  }

  Column.prototype.removeColumn = function() {
    this.$element.remove();
  }

  function Card(description) {
    const self = this;
    this.id = randomString();
    this.description = description;
    this.$element = createCard();

    function createCard() {
      const $card = $('<li>').addClass('card');
      const $cardDescription = $('<p>').addClass('card-description').text(self.description);
      const $cardDelete = $('<button>').addClass('btn-delete').text('X');

      $cardDelete.click(function() {
        self.removeCard();
      });

      $card.append($cardDelete);
      $card.append($cardDescription);
      return $card;
    }
  }

  Card.prototype.removeCard = function() {
    this.$element.remove();
  }

  const board = {
    name: 'Kanban Board',
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $('#board .column-container')
  };

  function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder'
    }).disableSelection();
  }

  $('.create-column').click(function() {
    const name = prompt('Enter column name'); //
    const column = new Column(name);
    board.addColumn(column); //
  });

  const todoColumn = new Column('Do zrobienia');
  const doingColumn = new Column('Robione');
  const doneColumn = new Column('Gotowe');

  board.addColumn(todoColumn);
  board.addColumn(doingColumn);
  board.addColumn(doneColumn);

  const card1 = new Card('Nowe zadanie');
  const card2 = new Card('W trakcie');
  const card3 = new Card('Zamknięta karta Kanban');

  todoColumn.addCard(card1);
  doingColumn.addCard(card2);
  doneColumn.addCard(card3);

});