// create some variables to keep track of counts
var person_count       = 0;
var location_count     = 0;
var organization_count = 0;

//load the xml content
function getXml() {
     return $.ajax({
         type: "GET",
         url: "Data/ch08.txt.xml",
         dataType: "xml",
         success: function (xml_content) {
             return xml_content;
         }
     });
}

//load the chapter text
 function getChapterText() {
     return $.ajax({
         type: "GET",
         url: "Data/ch08.txt",
         dataType: "text",
         success: function (text_content) {
             return text_content;
         }
     });
 }

// Use the given data to annotate a chapter
function annotateChapter(charseqs, spans, chapter) {
    //offset is used to keep track of the tags that I add to the chapter string
    var offset = 0;
    // loop over every span tag from the xml document, each tag has an accompanying charseqs node
    for (var i = 0; i < spans.length; i++) {
        var charseq = charseqs[i];
        var span = spans[i];
        var type = span.getAttribute('category');

        // handle the count of annotation types
        if (type === 'PERSON') {
            person_count++;
        }
        if (type === 'LOCATION') {
            location_count++;
        }
        if (type === 'ORGANIZATION') {
            organization_count++
        }

        /*
         Get positional information for the start and end of the annotation with an offset that accounts for
         previously added annotations;
         */
        var start = +charseq.getAttribute('START') + offset;
        var end = +charseq.getAttribute('END') + offset + 1;

        //create the span tag
        var open_tag = '<span class="' + span.getAttribute('category') + '">';
        var close_tag = '</span>';

        // wrap the appropriate text with the span tags
        var new_tag = open_tag + chapter.substr(start, end - start) + close_tag;

        //cut the chapter in two, omitting the annotated text & insert the new tag in the middle
        var chapter_beginning = chapter.substr(0, start);
        var chapter_end = chapter.substr(end);
        chapter = chapter_beginning + new_tag + chapter_end;

        //adjust the offset to account to the character length of the added span tags
        offset = offset + open_tag.length + close_tag.length;
    }
    return chapter;
}

//write the annotation type counts
function writeCounts() {
    $("li.PERSON").text('person count: '+person_count);
    $("li.LOCATION").text('location count: '+location_count);
    $("li.ORGANIZATION").text('organization count: '+organization_count);
}

//basic interaction to 'delete' annotations
function deleteAnnotation(span) {
    var span_class = span.getAttribute('class');
    if (span_class === 'PERSON') {
        person_count--;
    }
    if (span_class === 'LOCATION') {
        location_count--;
    }
    if (span_class === 'ORGANIZATION') {
        organization_count--;
    }
    span.setAttribute("class", "");
    writeCounts();
}
