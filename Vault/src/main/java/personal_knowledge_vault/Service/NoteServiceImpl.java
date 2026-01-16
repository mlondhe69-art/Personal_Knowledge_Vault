package personal_knowledge_vault.Service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import personal_knowledge_vault.Entity.Note;
import personal_knowledge_vault.Entity.User;
import personal_knowledge_vault.Exception.ResourceNotFoundException;
import personal_knowledge_vault.Repository.NoteRepository;
import personal_knowledge_vault.Repository.UserRepository;

@Service
public class NoteServiceImpl implements NoteService {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;

    public NoteServiceImpl(NoteRepository noteRepository, UserRepository userRepository) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
    }

    // Get currently logged-in user from SecurityContext (JWT)
    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated()
                || auth.getPrincipal().equals("anonymousUser")) {
            throw new RuntimeException("Unauthorized access");
        }

        String username = auth.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found: " + username));
    }

    @Override
    public Note createNote(Note note) {
        User user = getCurrentUser();
        note.setUser(user);
        return noteRepository.save(note);
    }

    @Override
    public List<Note> getMyNotes() {
        User user = getCurrentUser();
        return noteRepository.findByUserId(user.getId());
    }

    @Override
    public Note getMyNoteById(Long id) {
        User user = getCurrentUser();
        return noteRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Note not found with id " + id));
    }

    @Override
    public Note updateMyNote(Long id, Note note) {
        Note existing = getMyNoteById(id);
        existing.setTitle(note.getTitle());
        existing.setContent(note.getContent());
        return noteRepository.save(existing);
    }

    @Override
    public void deleteMyNote(Long id) {
        Note note = getMyNoteById(id);
        noteRepository.delete(note);
    }
}
