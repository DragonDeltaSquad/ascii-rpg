
var Maze;

(function(){
var WIDTH = 79;
var HEIGHT = 56;
var UP = 0;
var DOWN = 2;
var LEFT = 1;
var RIGHT = 3;
var moves = ["up", "left", "down", "right"];

Maze = function(width, height) {
  if (typeof width === "undefined") {width = WIDTH};
  if (typeof height === "undefined") {height = HEIGHT};
  this.width = width;
  this.height = height;
  this.grid = this.init_array(true);
	this.endpoints = [];
};


// static function for generating a maze object with a low ratio
// of wall to not wall
Maze.generate = function(width, height){
	var min_ratio = 100;
	var min_maze = null;
	var ratios = [];
	var tries = 0;
	var target_ratio = 0.55;
	//console.log(("target: " + target_ratio));
	while (((min_ratio > target_ratio) && (tries <= 100))) {
		maze = new Maze(width, height);
		maze.queue_maze();
		ratio = maze.ratio();
		ratios.push(ratio);
		if ((ratio < min_ratio)) {
			min_ratio = ratio;
			min_maze = maze;
		}

		tries += 1;
		if (((tries % 20) == 0)) {
			//console.log(("ratio: " + min_ratio));
		}

	}

	min_maze.join_start_end();
	return min_maze;
};

Maze.prototype.init_array = function(value) {
  var arr, col, row;
  if (typeof value === "undefined") {value = null};
  arr = [];
  var _$tmp2_end = this.width;
  for (col = 0; col < _$tmp2_end; col++) {
    arr.push([]);
    var _$tmp1_end = this.height;
    for (row = 0; row < _$tmp1_end; row++) {
      arr[col].push(value);
    }

  }

  return arr;
};

Maze.prototype.top = function(x, y) {
  if ((y > 0)) {
    return this.grid[x][(y - 1)];
  }

  return false;
};

Maze.prototype.bottom = function(x, y) {
  if ((y < (this.height - 1))) {
    return this.grid[x][(y + 1)];
  }

  return false;
};

Maze.prototype.left = function(x, y) {
  if ((x > 0)) {
    return this.grid[(x - 1)][y];
  }

  return false;
};

Maze.prototype.right = function(x, y) {
  if ((x < (this.width - 1))) {
    return this.grid[(x + 1)][y];
  }

  return false;
};

Maze.prototype.show = function() {
  var col, output, row;
  output = "";
  var _$tmp4_end = this.height;
  for (row = 0; row < _$tmp4_end; row++) {
    var _$tmp3_end = this.width;
    for (col = 0; col < _$tmp3_end; col++) {
      if (this.grid[col][row]) {
			
				if(
						this.top(col, row) &&
						this.bottom(col, row) &&
						this.right(col, row) &&
						this.left(col, row)
				)
					output += "&#9532;";
				else if(
						!this.top(col, row) &&
						this.bottom(col, row) &&
						!this.right(col, row) &&
						this.left(col, row)
				)
					output += "&#9488;";
				else  if(
						this.top(col, row) &&
						!this.bottom(col, row) &&
						this.right(col, row) &&
						!this.left(col, row)
				)
					output += "&#9492;";
				else  if(
						!this.top(col, row) &&
						this.bottom(col, row) &&
						this.right(col, row) &&
						!this.left(col, row)
				)
					output += " &#9484;";
				else  if(
						this.top(col, row) &&
						!this.bottom(col, row) &&
						!this.right(col, row) &&
						this.left(col, row)
				)
					output += "&#9496;";
				else  if(
						this.top(col, row) &&
						!this.bottom(col, row) &&
						this.right(col, row) &&
						this.left(col, row)
				)
					output += "&#9524;";
				else if(
						!this.top(col, row) &&
						this.bottom(col, row) &&
						this.right(col, row) &&
						this.left(col, row)
				)
					output += "&#9516;";
				else if(
						this.top(col, row) &&
						this.bottom(col, row) &&
						this.right(col, row) &&
						!this.left(col, row)
				)
					output += "&#9500;";
				else if(
						this.top(col, row) &&
						this.bottom(col, row) &&
						!this.right(col, row) &&
						this.left(col, row)
				)
					output += "&#9508;";
				else if(
						!this.top(col, row) &&
						!this.bottom(col, row) &&
						(
							this.right(col, row) ||
							this.left(col, row)
						)
				)
					output += "&mdash;";
				else if(
					(
						this.top(col, row) ||
						this.bottom(col, row)
					) &&
					!this.right(col, row) &&
					!this.left(col, row)
				)
					output += "&#9474;";
				else
					output += "x";
      } else {
        output += "&nbsp;";
      }

    }

    output += "<br>";
  }

  return output;
};

Maze.prototype.queue_maze = function() {
  var _, _$rapyd_tuple$_, move, new_x, new_y, queue, rev_move, x, y;
  queue = [];
  x = parseInt((this.width / 2));
  y = 1;
  this.grid[x][0] = false;
  this.grid[x][y] = false;
  queue.unshift([x, y]);
  y = (this.height - 2);
  this.grid[x][(this.height - 1)] = false;
  this.grid[x][y] = false;
  queue.unshift([x, y]);
  while ((queue.length > 0)) {
    _$rapyd_tuple$_ = queue.pop();
    x = _$rapyd_tuple$_[0];
    y = _$rapyd_tuple$_[1];
    for (_ = 0; _ < 10; _++) {
      move = Math.floor((Math.random() * 4));
      rev_move = ((move + 2) % 4);
      _$rapyd_tuple$_ = this.make_move(x, y, move);
      new_x = _$rapyd_tuple$_[0];
      new_y = _$rapyd_tuple$_[1];
      if (this.is_available_spot([new_x, new_y], move)) {
        _$rapyd_tuple$_ = this.build_maze(new_x, new_y, Math.floor((Math.random() * 11)));
        new_x = _$rapyd_tuple$_[0];
        new_y = _$rapyd_tuple$_[1];
        this.grid[new_x][new_y] = false;
        queue.unshift([new_x, new_y]);
      }

    }

  }

};

Maze.prototype.build_maze = function(x, y, depth) {
  var _$rapyd_tuple$_, move, no_inf, rev_move;
  if (typeof x === "undefined") {x = null};
  if (typeof y === "undefined") {y = null};
  if (typeof depth === "undefined") {depth = 10};
  if (((!x) || (!y))) {
    x = parseInt((this.width / 2));
    y = 1;
    this.grid[x][0] = false;
    this.grid[x][1] = false;
  }

  while ((((((x < (this.width - 1)) && (x > 0)) && (y < (this.height - 1))) && (y > 0)) && (depth > 0))) {
    if ((Math.floor(Math.random()) == 0)) {
      move = Math.floor((Math.random() * 4));
      rev_move = ((move + 2) % 4);
      no_inf = 0;
      while (((!this.is_available_spot(this.make_move(x, y, move), move)) && (no_inf < 10))) {
        move = Math.floor((Math.random() * 4));
        rev_move = ((move + 2) % 4);
        no_inf += 1;
      }
    }

    if ((no_inf == 10)) {
      return [x, y];
    }

    this.grid[x][y] = false;
    _$rapyd_tuple$_ = this.make_move(x, y, move);
    x = _$rapyd_tuple$_[0];
    y = _$rapyd_tuple$_[1];
    depth -= 1;
  }

  return [x, y];
};

Maze.prototype.make_move = function(x, y, move) {
  if ((move == UP)) {
    return [x, (y - 1)];
  } else if ((move == LEFT)) {
    return [(x - 1), y];
  } else if ((move == DOWN)) {
    return [x, (y + 1)];
  } else if ((move == RIGHT)) {
    return [(x + 1), y];
  }

  return null;
};

Maze.prototype.is_available_spot = function(pos, move) {
  var x = pos[0];
  var y = pos[1];
  if ((!this.grid[x][y])) {
    return false;
  }

  if (((((x == 0) || (x == (this.width - 1))) || (y == 0)) || (y == (this.height - 1)))) {
    return false;
  }

  if (((move == UP) && (!((((this.grid[(x - 1)][(y - 1)] && this.grid[x][(y - 1)]) && this.grid[(x + 1)][(y - 1)]) && this.grid[(x - 1)][y]) && this.grid[(x + 1)][y])))) {
    return false;
  }

  if (((move == DOWN) && (!((((this.grid[(x - 1)][(y + 1)] && this.grid[x][(y + 1)]) && this.grid[(x + 1)][(y + 1)]) && this.grid[(x - 1)][y]) && this.grid[(x + 1)][y])))) {
    return false;
  }

  if (((move == LEFT) && (!((((this.grid[x][(y - 1)] && this.grid[(x - 1)][(y - 1)]) && this.grid[(x - 1)][y]) && this.grid[(x - 1)][(y + 1)]) && this.grid[x][(y + 1)])))) {
    return false;
  }

  if (((move == RIGHT) && (!((((this.grid[x][(y - 1)] && this.grid[(x + 1)][(y - 1)]) && this.grid[(x + 1)][y]) && this.grid[(x + 1)][(y + 1)]) && this.grid[x][(y + 1)])))) {
    return false;
  }

  return true;
};

Maze.prototype.fill = function(x, y) {
  var fill_sub, visited;
  visited = this.init_array(false);
	var maze = this;
  fill_sub = function(x, y) {
		var num_recursions = 0;
    if (((!maze.grid[x][y]) && (visited[x][y] === false))) {
			num_recursions += 1;
      visited[x][y] = true;
      if (((x > 0) && (!maze.grid[(x - 1)][y]))) {
        num_recursions += fill_sub((x - 1), y);
      }

      if (((x < (maze.width - 1)) && (!maze.grid[(x + 1)][y]))) {
        num_recursions += fill_sub((x + 1), y);
      }

      if (((y > 0) && (!maze.grid[x][(y - 1)]))) {
        num_recursions += fill_sub(x, (y - 1));
      }

      if (((y < (maze.height - 1)) && (!maze.grid[x][(y + 1)]))) {
        num_recursions += fill_sub(x, (y + 1));
      }
    }
		if(num_recursions === 1)
			maze.endpoints.push([x, y]);
		return num_recursions;

  };

  fill_sub(x, y);
  return visited;
};

Maze.prototype.join_start_end = function() {
  var end, join_locs, loc, start, x, y;
  start = this.fill(parseInt((this.width / 2)), 0);
  end = this.fill(parseInt((this.width / 2)), (this.height - 1));
  join_locs = [];
  for (x = 0; x < this.width; x++) {
    for (y = 0; y < this.height; y++) {
      if (start[x][y]) {
        if ((((y < (this.height - 2)) && this.grid[x][(y + 1)]) && end[x][(y + 2)])) {
          join_locs.push([x, (y + 1)]);
        }

        if ((((y > 1) && this.grid[x][(y - 1)]) && end[x][(y - 2)])) {
          join_locs.push([x, (y - 1)]);
        }

        if ((((x < (this.width - 2)) && this.grid[(x + 1)][y]) && end[(x + 2)][y])) {
          join_locs.push([(x + 1), y]);
        }

        if ((((x > 1) && this.grid[(x - 1)][y]) && end[(x - 2)][y])) {
          join_locs.push([(x - 1), y]);
        }
      }
    }
  }

  loc = join_locs[Math.floor((Math.random() * join_locs.length))];
  this.grid[loc[0]][loc[1]] = false;
};

Maze.prototype.ratio = function() {
  var col, element, filled, total;
  total = 0;
  filled = 0;
  var _$tmp10_data = this.grid;
  var _$tmp11_len = _$tmp10_data.length;
  for (var _$tmp12_index = 0; _$tmp12_index < _$tmp11_len; _$tmp12_index++) {
    col = _$tmp10_data[_$tmp12_index];

    var _$tmp7_data = col;
    var _$tmp8_len = _$tmp7_data.length;
    for (var _$tmp9_index = 0; _$tmp9_index < _$tmp8_len; _$tmp9_index++) {
      element = _$tmp7_data[_$tmp9_index];

      total += 1;
      if (element) {
        filled += 1;
      }

    }

  }

  return (filled / parseFloat(total));
};

Maze.prototype.toArray = function(map){
	if(map === undefined)
		map = {};
	
	var out = [];
	for (var row = 0; row < this.height; row++) {
		out.push([]);
		for (var col = 0; col < this.width; col++) {
			if(map.hasOwnProperty(this.grid[col][row]))
				out[row][col] = map[this.grid[col][row]];
			else
				out[row][col] = this.grid[col][row];
		}
	}
	return out;
}

var average = function(arr) {
  return (sum(arr) / parseFloat(arr.length));
};

var std_dev = function(arr) {
  var a;
  a = average(arr);
  return Math.sqrt(average(map((function(x) {
    ((x - a) * (x - a));
  }), arr)));
};

}());