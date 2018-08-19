//welcomepage functions
    $('#gamepage').hide();
    $('#divscoreboard').hide();

    // Easy Mode
    $('#easy').on('click', function() {
        $('#gamepage').attr('data-difficulty', 'easy');
    });

    // Hard Mode
    $('#hard').on('click', function() {
        $('#gamepage').attr('data-difficulty', 'hard');
    });