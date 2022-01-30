package com.vladhacksmile.springbackend.repository;

import com.vladhacksmile.springbackend.models.Request;
import com.vladhacksmile.springbackend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import javax.transaction.Transactional;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {
    @Modifying
    @Transactional
    @Query(value="delete from Request r where r.user = ?1")
    void deleteRequestsByUser(User user);
}
