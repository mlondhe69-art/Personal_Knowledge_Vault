package personal_knowledge_vault.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import personal_knowledge_vault.Entity.Note;


public interface NoteRepository extends JpaRepository<Note, Long> {

    List<Note> findByUserEmail(String email);

    List<Note> findByUserEmailAndFavoriteTrue(String email);

    Optional<Note> findByIdAndUserEmail(Long id, String email);
}
