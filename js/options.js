// Saves options to localStorage.
function save_options() {
  var select = document.getElementById("color");
  var color = select.children[select.selectedIndex].value;

	 // Save it using the Chrome extension storage API.
  chrome.storage.sync.set({'favorite_color': color}, function() {
    // Notify that we saved.
    message('Settings saved');
  });

}

// Restores select box state to saved value from localStorage.
function restore_options() {

	storageArea.get('favorite_color', function(favorites)
	{
		var favorite = favorites[0];
		var select = document.getElementById("color");
		for (var i = 0; i < select.children.length; i++) {
			var child = select.children[i];
			if (child.value == favorite) {
				child.selected = "true";
				break;
			}
		}
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
