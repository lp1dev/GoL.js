
#!/bin/env bash
emcc gol.c -o dist/gol.html -s EXPORTED_FUNCTIONS='["_create", "_next"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'
