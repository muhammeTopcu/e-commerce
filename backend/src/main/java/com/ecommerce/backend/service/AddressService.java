package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.user.AddressDto;
import com.ecommerce.backend.dto.user.AddressRequest;
import com.ecommerce.backend.entity.AddressEntity;
import com.ecommerce.backend.entity.UserEntity;
import com.ecommerce.backend.exception.ApiException;
import com.ecommerce.backend.repository.AddressRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public List<AddressDto> list(UserEntity user) {
        return addressRepository.findByUserId(user.getId()).stream().map(this::toDto).toList();
    }

    public List<AddressDto> create(UserEntity user, AddressRequest request) {
        AddressEntity entity = new AddressEntity();
        apply(request, entity);
        entity.setUser(user);
        addressRepository.save(entity);
        return list(user);
    }

    public List<AddressDto> update(UserEntity user, AddressRequest request) {
        if (request.id() == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Address id is required");
        }
        AddressEntity entity = addressRepository.findById(request.id())
                .filter(x -> x.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Address not found"));
        apply(request, entity);
        addressRepository.save(entity);
        return list(user);
    }

    public List<AddressDto> delete(UserEntity user, Long addressId) {
        AddressEntity entity = addressRepository.findById(addressId)
                .filter(x -> x.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Address not found"));
        addressRepository.delete(entity);
        return list(user);
    }

    private void apply(AddressRequest request, AddressEntity entity) {
        entity.setTitle(request.title());
        entity.setName(request.name());
        entity.setSurname(request.surname());
        entity.setPhone(request.phone());
        entity.setCity(request.city());
        entity.setDistrict(request.district());
        entity.setNeighborhood(request.neighborhood());
    }

    private AddressDto toDto(AddressEntity entity) {
        return new AddressDto(
                entity.getId(),
                entity.getTitle(),
                entity.getName(),
                entity.getSurname(),
                entity.getPhone(),
                entity.getCity(),
                entity.getDistrict(),
                entity.getNeighborhood()
        );
    }
}
