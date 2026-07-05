package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.user.CardDto;
import com.ecommerce.backend.dto.user.CardRequest;
import com.ecommerce.backend.entity.CardEntity;
import com.ecommerce.backend.entity.UserEntity;
import com.ecommerce.backend.exception.ApiException;
import com.ecommerce.backend.repository.CardRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardService {

    private final CardRepository cardRepository;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public List<CardDto> list(UserEntity user) {
        return cardRepository.findByUserId(user.getId()).stream().map(this::toDto).toList();
    }

    public List<CardDto> create(UserEntity user, CardRequest request) {
        CardEntity entity = new CardEntity();
        apply(request, entity);
        entity.setUser(user);
        cardRepository.save(entity);
        return list(user);
    }

    public List<CardDto> update(UserEntity user, CardRequest request) {
        if (request.id() == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Card id is required");
        }
        CardEntity entity = cardRepository.findById(request.id())
                .filter(x -> x.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Card not found"));
        apply(request, entity);
        cardRepository.save(entity);
        return list(user);
    }

    public List<CardDto> delete(UserEntity user, Long cardId) {
        CardEntity entity = cardRepository.findById(cardId)
                .filter(x -> x.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Card not found"));
        cardRepository.delete(entity);
        return list(user);
    }

    private void apply(CardRequest request, CardEntity entity) {
        entity.setCardNo(request.card_no().replaceAll("\\s+", ""));
        entity.setExpireMonth(request.expire_month());
        entity.setExpireYear(request.expire_year());
        entity.setNameOnCard(request.name_on_card());
    }

    private CardDto toDto(CardEntity entity) {
        return new CardDto(
                entity.getId(),
                entity.getCardNo(),
                entity.getExpireMonth(),
                entity.getExpireYear(),
                entity.getNameOnCard()
        );
    }
}
