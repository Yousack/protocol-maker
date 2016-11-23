$(function () {
    var resultTags = document.getElementsByClassName('tes-result')[0];

    $('#protocol').change(function () {
        resultTags.innerHTML = '';

        $('#rank').text($('input[name="rank"]').val());
        $('#name').text($('input[name="name"]').val());
        $('#nation').text($('input[name="nation"]').val());
        $('#snum').text($('input[name="snum"]').val());

        var tes = 0;

        $('div.tes div.is-horizontal').each(function (tech_i, e) {
            var tesRow = this.children[1].children;
            var techInput = tesRow[0].children[0].value;
            if (techInput == '') {
                return true;
            }
            var goe = parseInt(tesRow[1].children[0].value);

            var bv = 0
            var techElems = techInput.split('+');
            techElems.forEach(function (e, i, a) {
                var jump = e.match(/([1-4])(T|S|Lo|F|Lz|A)([xe!<]*)/i);
                if (jump) {
                    var jumpElem = jump[1] + jump[2].toLowerCase();
                    var info = jump[3];
                    if (info.indexOf('<<') >= 0) {
                        jumpElem = (parseInt(jump[1]) - 1).toString() + jump[2].toLowerCase();
                        if (info.indexOf('e') >= 0) {
                            bv += sov[jumpElem][1];
                        } else {
                            bv += sov[jumpElem][0];
                        }
                    } else {
                        if (info.indexOf('<') >= 0) {
                            if (info.indexOf('e') >= 0) {
                                bv += sov[jumpElem][2];
                            } else {
                                bv += sov[jumpElem][1];
                            }
                        } else if (info.indexOf('e') >= 0) {
                            bv += sov[jumpElem][1];
                        } else {
                            bv += sov[jumpElem][0];
                        }
                    }
                } else {
                    var isv = false;
                    if (e.match(/V$/i)) {
                        isv = true
                    }
                    var other = e.replace(/V$/i, '');

                    var level = null;
                    if (other.match(/[1234b]$/i)) {
                        level = other[other.length - 1];
                        if (level == 'B') {
                            level = 'b';
                        } else {
                            level = parseInt(level);
                        }
                        other = other.replace(/[1234b]$/i, '');
                    }

                    if (other.match(/^FC?CoSp/i) || other.match(/^FC[ULCS]Sp/i)) {
                        other = other.replace(/^F/i, '')
                    }

                    other = other.toLowerCase()

                    if (level == null) {
                        bv = sov[other];
                    } else if (isv) {
                        bv = sov[other][1][level];
                    } else {
                        bv = sov[other][0][level];
                    }
                }
            });

            if (techInput.indexOf('x') >= 0) {
                bv *= 1.1;
            }

            if (techInput.match(/REP/i)) {
                bv *= 0.7;
            } else if (techInput.match(/SEQ/i)) {
                bv *= 0.8;
            }


            bv = (Math.round(bv * 100) / 100).toFixed(2);
            tes += parseFloat(bv);

            var techTag = document.createElement('div');
            techTag.className = 'columns';

            var numTag = document.createElement('div');
            numTag.className = 'column is-1';
            var pTag = document.createElement('p');
            pTag.textContent = (tech_i + 1).toString();
            numTag.appendChild(pTag);
            techTag.appendChild(numTag);

            var elemTag = document.createElement('div');
            elemTag.className = 'column is-4';
            var pTag = document.createElement('p');
            pTag.textContent = techInput.replace(/[x!]/, '');
            elemTag.appendChild(pTag);
            techTag.appendChild(elemTag);

            var infoTag = document.createElement('div');
            infoTag.className = 'column';
            var pTag = document.createElement('p');
            if (techInput.indexOf('x') >= 0) {
                pTag.textContent += 'x';
            }
            if (techInput.indexOf('e') >= 0) {
                pTag.textContent += 'e';
            }
            if (techInput.indexOf('!') >= 0) {
                pTag.textContent += '!';
            }
            infoTag.appendChild(pTag);
            techTag.appendChild(infoTag);

            var bvTag = document.createElement('div');
            bvTag.className = 'column';
            var pTag = document.createElement('p');
            pTag.textContent = bv;
            bvTag.appendChild(pTag);
            techTag.appendChild(bvTag);

            var goeTag = document.createElement('div');
            goeTag.className = 'column';
            var pTag = document.createElement('p');
            pTag.textContent = '';
            goeTag.appendChild(pTag);
            techTag.appendChild(goeTag);

            var sopTag = document.createElement('div');
            sopTag.className = 'column';
            var pTag = document.createElement('p');
            pTag.textContent = '';
            sopTag.appendChild(pTag);
            techTag.appendChild(sopTag);

            resultTags.appendChild(techTag);
        });

        tes = (Math.round(tes * 100) / 100).toFixed(2);
        $('#tes').text(tes);
    });
});
