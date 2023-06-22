const docTabTerm    = document.querySelector('#legal-tab-term');
const docTabPolicy  = document.querySelector('#legal-tab-policy');
const docTabImprint = document.querySelector('#legal-tab-imprint');
const docTabContent = document.querySelector('#legal-tab-content');

const textTerm =
    `
    <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
        sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
        justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
        ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
        et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
        est Lorem ipsum dolor sit amet.
    </p>
    <br>
    <p>
        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel
        illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
        blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum
        dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
        dolore magna aliquam erat volutpat.
    </p>
    <br>
    <p>
        Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
        aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit
        esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et
        iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait
        nulla facilisi.
    </p>
`;

const textPolicy =
    `
    <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
        sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
        justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
        ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
        et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
        est Lorem ipsum dolor sit amet.
    </p>
`;

const textImprint =
    `
    <p>
        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel
        illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
        blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum
        dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
        dolore magna aliquam erat volutpat.
    </p>
    <br>
    <p>
        Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
        aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit
        esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et
        iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait
        nulla facilisi.
    </p>
`;

docTabContent.innerHTML = textTerm;

docTabTerm.addEventListener('click', () => {
    document.querySelector('.tab-selected').classList.remove('tab-selected');
    docTabTerm.classList.add('tab-selected');
    
    docTabContent.innerHTML = textTerm;
});

docTabPolicy.addEventListener('click', () => {
    document.querySelector('.tab-selected').classList.remove('tab-selected');
    docTabPolicy.classList.add('tab-selected');
    docTabContent.innerHTML = textPolicy;
});

docTabImprint.addEventListener('click', () => {
    document.querySelector('.tab-selected').classList.remove('tab-selected');
    docTabImprint.classList.add('tab-selected');
    docTabContent.innerHTML = textImprint;
});

