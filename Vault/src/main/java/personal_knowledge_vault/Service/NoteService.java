package personal_knowledge_vault.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import personal_knowledge_vault.Entity.Note;
import personal_knowledge_vault.Entity.User;
import personal_knowledge_vault.Exception.ResourceNotFoundException;
import personal_knowledge_vault.Repository.NoteRepository;
import personal_knowledge_vault.Repository.UserRepository;

@Service
public class NoteService {

    private final NoteRepository repo;
    private final UserRepository userRepository;

    public NoteService(NoteRepository repo, UserRepository userRepository) {
        this.repo = repo;
        this.userRepository = userRepository;
    }

    // CREATE
    public Note create(Note note, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        note.setUser(user);              // ✅ THIS IS CORRECT
        note.setCreatedAt(LocalDateTime.now());
        return repo.save(note);
    }

    // GET ALL FOR USER
    public List<Note> getAllByUserEmail(String email) {
        return repo.findByUserEmail(email);
    }

    // GET ONE FOR USER
    public Note getByIdForUser(Long id, String email) {
        return repo.findByIdAndUserEmail(id, email)
                .orElseThrow(() -> new ResourceNotFoundException("Note not found"));
    }

    // UPDATE
    public Note update(Long id, Note updated, String email) {
        Note note = getByIdForUser(id, email);
        note.setTitle(updated.getTitle());
        note.setContent(updated.getContent());
        note.setFavorite(updated.isFavorite());
        note.setUpdatedAt(LocalDateTime.now());
        return repo.save(note);
    }

    // DELETE
    public void delete(Long id, String email) {
        Note note = getByIdForUser(id, email);
        repo.delete(note);
    }
    
 // ✅ GET FAVORITE NOTES
    public List<Note> getFavorites(String email) {
        return repo.findByUserEmailAndFavoriteTrue(email);
    }

    // ✅ TOGGLE FAVORITE
    public Note toggleFavorite(Long id, String email) {
        Note note = repo.findByIdAndUserEmail(id, email)
                .orElseThrow(() -> new ResourceNotFoundException("Note not found"));

        note.setFavorite(!note.isFavorite());
        note.setUpdatedAt(LocalDateTime.now());

        return repo.save(note);
    }

}


