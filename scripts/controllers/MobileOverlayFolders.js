function MobileOverlayFolders(element) {

  const handleClick = function (e) {

    let target = e.target;

    while (target !== element && target.getAttribute('data-controller-folder-toggle') === null) {
      target = target.parentNode;
    }

    const folderID = target.getAttribute('data-controller-folder-toggle');

    if (folderID) {

      // FolderID, folder is being clicked
      const folder = element.querySelector('[data-controller-folder="' + folderID + '"]');

      if (folder) {
        folder.classList.toggle('is-active-folder');
        element.classList.toggle('has-active-folder');
      }

    }


  };

  element.addEventListener('click', handleClick);

}

export default MobileOverlayFolders;