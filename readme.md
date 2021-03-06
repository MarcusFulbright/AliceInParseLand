# Alice In Parse Land

This is an exercise described as follows:

You are a data analyst whose job is to observe and correct annotations that come out of the machine-learning platform.  Your tasks include reviewing the annotations made by the system and removing any unnecessary or incorrect annotations - hey, it's not always 100% accurate.  Basically, if the system says that "The White House", e.g., is a person, you can delete that annotation.

There are only 3 categories of annotations: 'PERSON', 'LOCATION', and 'ORGANIZATION'.  As a developer, you will need to provide a simple web interface that displays the document in full with the text of the annotations highlighted.  You will also need to provide a simple mechanism that allows the analyst to delete incorrect annotations.  The analyst also requires a running total of each annotation type in the document to be displayed in the interface.

Two data files are supplied in the `Data/` directory:
  * `ch08.txt`: a text file containing the contents from the 8th chapter of Alice In Wonderland
  * `ch08.txt.xml`: an xml document describing the position and text for annotations that pairs with *ch08.txt*

## Constraints

* You must use jQuery for any DOM manipulation that you want to perform in your interface if you choose to do this in the client
* You should not use any other JavaScript libraries for this assignment
* CSS, if used, must be separated into css files (i.e., no in-line CSS where it makes sense to segment)

## Set Up

This repository is 100% self contained. It only relies on *Jquery* which resides in the `Js/` directory. To view the interface, simply launch `index.html` in the latest version of chrome. Other browsers are not supported. No back end, server, or database is required.

## Methodology

Parse `ch08.txt` and insert a *p* tag with its contents. Separately, parse `ch08.txt.xml` to determine where annotations belong. To display the annotations, *span* tags wrap around passages with annotations. These span tags have a CSS class that corresponds to the *category* of the annotation. This class allows for annotations to get color coded and provides a visual aid. Clicking on the annotation will remove the *css* class from the annotation and reduce the appropriate count by 1. Any changes to the annotation will not get saved to the underlying data files and only only affect the displayed data.
