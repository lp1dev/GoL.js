#include <string.h>
#include <stdio.h>
#include <stdlib.h>

#define DEAD '0'
#define ALIVE '1'

char* create(int size) {
  char *grid = malloc(sizeof(char) * (size * size));
  for (int x = 0; x < size; x++) {
    for (int y = 0; y < size; y++) {
      grid[(y * size) + x] = DEAD;
    }
  }
  return grid;
}

char get_cell(char *grid, int x, int y, int size) {
  int pos = (y * size) + x;
  if (pos < (size * size)) {
    return grid[pos];
  }
  return DEAD;
}

int get_cell_binary(char *grid, int x, int y, int size) {
    int pos = (y * size) + x;
    if (pos < (size * size)) {
      return grid[pos] == DEAD ? 0: 1;
    }
    return 0;
}

void print_grid(char *grid, int size) {
  for (int i = 0;i < (size * size); i++) {

    if ((i % size) == 0) {
      printf("\n");
    }
    printf("%c" ,grid[i]);
  }
  printf("\n");
}

char *next(char *grid, int size) {
  char *grid_buffer = malloc(sizeof(char) *(size * size));
  strncpy(grid_buffer, grid, size * size);
  
  for (int x = 0; x < size; x++) {
    for (int y = 0; y < size; y++) {
      char cell = get_cell(grid, x, y, size);
      int pos = (y * size) + x;
      printf("pos(%i, %i) = %i\n", x, y, pos);
      int liveNeighbours = get_cell_binary(grid, y - 1, x - 1, size) +
        get_cell_binary(grid, y - 1, x, size) +
        get_cell_binary(grid, y - 1, x + 1, size) +
        get_cell_binary(grid, y, x + 1, size) +
        get_cell_binary(grid, y + 1, x - 1, size) +
        get_cell_binary(grid, y + 1, x, size) +
        get_cell_binary(grid, y + 1, x + 1, size);
      if (cell == ALIVE) {
        if (liveNeighbours < 2 || liveNeighbours > 3) {
          grid_buffer[pos] = DEAD;
        }
      } else {
        if (liveNeighbours == 3) {
          grid_buffer[pos] = ALIVE;
        }
      }
    }
  }
  return grid_buffer;
}

void test(int size) {
  char *grid = create(size);
  grid[2] = ALIVE;
  grid[3] = ALIVE;
  grid[4] = ALIVE;
  grid[5] = ALIVE;
  print_grid(grid, size);
  grid = next(grid, size);
  print_grid(grid, size);
  grid = next(grid, size);
  print_grid(grid, size);
}

int main(int argc, char **argv) {
  test(16);
  return 0;
}
