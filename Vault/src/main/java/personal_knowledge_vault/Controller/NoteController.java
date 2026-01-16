package personal_knowledge_vault.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import personal_knowledge_vault.Entity.Note;
import personal_knowledge_vault.Service.NoteService;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteService service;

    public NoteController(NoteService service) {
        this.service = service;
    }

    // ================= CREATE NOTE =================
    @PostMapping
    public ResponseEntity<Note> create(@RequestBody Note note, Authentication auth) {

        // 🔐 Ignore any user coming from frontend
        note.setUser(null);

        return new ResponseEntity<>(
                service.create(note, auth.getName()),
                HttpStatus.CREATED
        );
    }

    // ================= GET USER NOTES =================
    @GetMapping
    public List<Note> all(Authentication auth) {
        return service.getAllByUserEmail(auth.getName());
    }

    // ================= GET ONE NOTE =================
    @GetMapping("/{id}")
    public Note one(@PathVariable Long id, Authentication auth) {
        return service.getByIdForUser(id, auth.getName());
    }

    // ================= UPDATE NOTE =================
    @PutMapping("/{id}")
    public Note update(@PathVariable Long id, @RequestBody Note note, Authentication auth) {
        return service.update(id, note, auth.getName());
    }

    // ================= DELETE NOTE =================
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id, Authentication auth) {
        service.delete(id, auth.getName());
    }

    // ✅ GET FAVORITES
    @GetMapping("/favorites")
    public List<Note> favorites(Authentication auth) {
        return service.getFavorites(auth.getName());
    }

    // ✅ TOGGLE FAVORITE
    @PutMapping("/{id}/favorite")
    public Note toggleFavorite(@PathVariable Long id, Authentication auth) {
        return service.toggleFavorite(id, auth.getName());
    }
}
