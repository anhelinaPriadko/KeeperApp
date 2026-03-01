import List "mo:base/List";
import Text "mo:base/Text";
import Debug "mo:base/Debug";

persistent actor DKeeper{
  public type Note = {
    title: Text;
    content: Text;
  };

  var notes: List.List<Note> = List.nil();

  public func addnote(titleText: Text, contentText: Text): async () {
    let newNote: Note = {title = titleText; content = contentText;};
    notes := List.push(newNote, notes);
    Debug.print(debug_show(notes));
  };

  public query func getnotes(): async [Note] {
    return List.toArray(notes);
  };

  public func deletenote(index: Nat): async () {
    if(index >= List.size(notes) or index < 0) {
      Debug.print("Index out of bounds");
      return;
    };
    let before:List.List<Note> = List.take(notes, index);
    let after:List.List<Note> = List.drop(notes,index + 1);
    notes := List.append(before, after);
  };
}